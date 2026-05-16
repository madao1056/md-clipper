(() => {
  /**
   * content.js — ページ本文の抽出とMarkdown変換
   * Readability.jsで本文抽出 → Turndown.jsでHTML→Markdown変換
   */

  /**
   * 現在のページからMarkdownを生成する
   * @returns {{ title: string, markdown: string, url: string, domain: string }}
   */
  function extractAndConvert() {
    const url = location.href;
    const domain = location.hostname;
    const today = new Date().toISOString().split("T")[0];

    // Readabilityで本文抽出（DOMのクローンを渡す）
    const documentClone = document.cloneNode(true);
    const reader = new Readability(documentClone);
    const article = reader.parse();

    let title = article?.title || document.title || "Untitled";
    let htmlContent = article?.content || document.body.innerHTML;

    // Turndownで変換
    const turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      bulletListMarker: "-",
    });

    // テーブルサポート（簡易）
    turndownService.addRule("table", {
      filter: "table",
      replacement: (_content, node) => {
        const rows = node.querySelectorAll("tr");
        if (rows.length === 0) return "";
        const lines = [];
        rows.forEach((row, i) => {
          const cells = row.querySelectorAll("th, td");
          const line = Array.from(cells)
            .map((c) => c.textContent.trim().replace(/\|/g, "\\|"))
            .join(" | ");
          lines.push(`| ${line} |`);
          if (i === 0) {
            const sep = Array.from(cells)
              .map(() => "---")
              .join(" | ");
            lines.push(`| ${sep} |`);
          }
        });
        return "\n\n" + lines.join("\n") + "\n\n";
      },
    });

    const body = turndownService.turndown(htmlContent);

    // Frontmatter付きMarkdown
    const markdown = [
      "---",
      `title: "${title.replace(/"/g, '\\"')}"`,
      `url: "${url}"`,
      `date: ${today}`,
      `domain: "${domain}"`,
      "---",
      "",
      body,
    ].join("\n");

    return { title, markdown, url, domain };
  }

  // background / popup からのメッセージを受信
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.action === "ping") {
      sendResponse({ pong: true });
      return;
    }
    if (message.action === "extract") {
      try {
        const result = extractAndConvert();
        sendResponse({ success: true, data: result });
      } catch (err) {
        sendResponse({ success: false, error: err.message });
      }
    }
    // 非同期sendResponseのためtrueを返す
    return true;
  });
})();
