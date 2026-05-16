/**
 * background.js — Service Worker
 * ダウンロード処理 + 右クリックメニュー
 */

// 右クリックメニュー登録
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "md-clipper-save",
    title: "Markdownで保存",
    contexts: ["page", "selection"],
  });
});

// 右クリックメニューハンドラ
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "md-clipper-save" && tab?.id) {
    clipPage(tab.id);
  }
});

/**
 * content.js に抽出を依頼し、ダウンロードを実行する
 * @param {number} tabId
 */
async function clipPage(tabId) {
  try {
    const response = await chrome.tabs.sendMessage(tabId, { action: "extract" });
    if (!response?.success) {
      console.error("MD Clipper: extraction failed", response?.error);
      return;
    }
    await downloadMarkdown(response.data.markdown, response.data.title);
  } catch (err) {
    console.error("MD Clipper: error", err);
  }
}

/**
 * Markdownテキストを.mdファイルとしてダウンロードする
 * @param {string} markdown
 * @param {string} title
 */
async function downloadMarkdown(markdown, title) {
  const { subfolder = "md-clipper" } = await chrome.storage.sync.get("subfolder");

  const today = new Date().toISOString().split("T")[0];
  const sanitized = sanitizeFilename(title);
  const filename = `${today}_${sanitized}.md`;

  const path = subfolder ? `${subfolder}/${filename}` : filename;

  // Blob URLを生成してダウンロード
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  try {
    await chrome.downloads.download({
      url,
      filename: path,
      saveAs: false,
    });
  } finally {
    // 少し待ってからURLを解放（ダウンロード開始を待つ）
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
}

/**
 * ファイル名に使えない文字を除去してサニタイズ
 * @param {string} name
 * @returns {string}
 */
function sanitizeFilename(name) {
  return name
    .replace(/[<>:"/\\|?*\x00-\x1f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .substring(0, 100);
}

// popup.js からのダウンロード要求を受け取る
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.action === "download") {
    downloadMarkdown(message.markdown, message.title)
      .then(() => sendResponse({ success: true }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }
});
