/**
 * options.js — 設定画面ロジック
 */

const $subfolder = document.getElementById("subfolder");
const $save = document.getElementById("save");
const $status = document.getElementById("status");

// 設定を読み込み
chrome.storage.sync.get("subfolder", ({ subfolder = "md-clipper" }) => {
  $subfolder.value = subfolder;
});

// 保存
$save.addEventListener("click", () => {
  const subfolder = $subfolder.value.trim();
  chrome.storage.sync.set({ subfolder }, () => {
    $status.textContent = "保存しました";
    setTimeout(() => { $status.textContent = ""; }, 2000);
  });
});
