/**
 * popup.js — ポップアップUIロジック
 */

const $title = document.getElementById("title-input");
const $subfolder = document.getElementById("subfolder-input");
const $saveBtn = document.getElementById("save-btn");
const $copyBtn = document.getElementById("copy-btn");
const $previewToggle = document.getElementById("preview-toggle");
const $previewArea = document.getElementById("preview-area");
const $status = document.getElementById("status");
const $main = document.getElementById("main");
const $loading = document.getElementById("loading");

/** @type {string} */
let currentMarkdown = "";

// 初期化: ページ情報を取得
(async () => {
  try {
    // 設定読み込み
    const { subfolder = "md-clipper" } = await chrome.storage.sync.get("subfolder");
    $subfolder.value = subfolder;

    // アクティブタブからMarkdownを取得
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) throw new Error("タブが見つかりません");

    // content scriptが未注入の場合に備えてフォールバック注入
    try {
      await chrome.tabs.sendMessage(tab.id, { action: "ping" });
    } catch {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["lib/readability.js", "lib/turndown.js", "content.js"],
      });
    }

    const response = await chrome.tabs.sendMessage(tab.id, { action: "extract" });
    if (!response?.success) throw new Error(response?.error || "抽出に失敗しました");

    $title.value = response.data.title;
    currentMarkdown = response.data.markdown;
    $previewArea.textContent = currentMarkdown;

    $loading.style.display = "none";
    $main.style.display = "block";
  } catch (err) {
    $loading.textContent = `エラー: ${err.message}`;
  }
})();

// 保存ボタン
$saveBtn.addEventListener("click", async () => {
  $saveBtn.disabled = true;
  setStatus("");

  try {
    // タイトルが編集された場合、frontmatterを更新
    const markdown = updateFrontmatterTitle(currentMarkdown, $title.value);

    // サブフォルダ設定を一時的に反映
    const subfolder = $subfolder.value.trim();
    await chrome.storage.sync.set({ subfolder });

    // background.jsにダウンロード要求
    const response = await chrome.runtime.sendMessage({
      action: "download",
      markdown,
      title: $title.value,
    });

    if (response?.success) {
      setStatus("保存しました", "success");
    } else {
      setStatus(`保存失敗: ${response?.error || "不明なエラー"}`, "error");
    }
  } catch (err) {
    setStatus(`エラー: ${err.message}`, "error");
  } finally {
    $saveBtn.disabled = false;
  }
});

// コピーボタン
$copyBtn.addEventListener("click", async () => {
  try {
    const markdown = updateFrontmatterTitle(currentMarkdown, $title.value);
    await navigator.clipboard.writeText(markdown);
    setStatus("クリップボードにコピーしました", "success");
  } catch (err) {
    setStatus(`コピー失敗: ${err.message}`, "error");
  }
});

// プレビュー折りたたみ
$previewToggle.addEventListener("click", () => {
  const isOpen = $previewArea.style.display === "block";
  $previewArea.style.display = isOpen ? "none" : "block";
  $previewToggle.textContent = isOpen ? "▶ プレビュー" : "▼ プレビュー";
});

/**
 * frontmatterのtitleを更新する
 * @param {string} markdown
 * @param {string} newTitle
 * @returns {string}
 */
function updateFrontmatterTitle(markdown, newTitle) {
  return markdown.replace(
    /^(---\ntitle: )".*"/m,
    `$1"${newTitle.replace(/"/g, '\\"')}"`
  );
}

/**
 * ステータスメッセージを表示
 * @param {string} msg
 * @param {"success" | "error" | ""} type
 */
function setStatus(msg, type = "") {
  $status.textContent = msg;
  $status.className = `status ${type}`;
  if (msg) {
    setTimeout(() => {
      $status.textContent = "";
      $status.className = "status";
    }, 3000);
  }
}
