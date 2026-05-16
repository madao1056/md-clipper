# Privacy Policy — MD Clipper

**Last updated: 2026-05-16**

## Overview

MD Clipper is a Chrome extension that converts web pages to Markdown files. Your privacy is important to us.

## Data Collection

MD Clipper does **NOT** collect, store, or transmit any personal data or browsing history.

## How It Works

- When you click the extension icon or use the context menu, the extension reads the **current page's HTML content** in your browser tab.
- The HTML is processed **entirely on your device** using Readability.js (for article extraction) and Turndown.js (for Markdown conversion).
- The resulting Markdown file is saved to your local Downloads folder.
- **No data is sent to any server.** All processing happens locally in your browser.

## Permissions Explained

| Permission | Purpose |
|---|---|
| `activeTab` | Access the current tab's content only when you activate the extension |
| `scripting` | Inject the content extraction script into the active tab |
| `downloads` | Save the generated Markdown file to your Downloads folder |
| `storage` | Remember your subfolder preference (stored locally in Chrome) |
| `contextMenus` | Add "Save as Markdown" to the right-click menu |

## Third-Party Libraries

- **Readability.js** (Mozilla, Apache 2.0) — Extracts article content from web pages
- **Turndown.js** (MIT) — Converts HTML to Markdown

These libraries run locally and do not communicate with external servers.

## Changes

If this privacy policy changes, the update will be posted here and in the extension's GitHub repository.

## Contact

If you have questions, please open an issue at:
https://github.com/madao1056/md-clipper/issues
