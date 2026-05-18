MD Clipper is a Chrome extension that converts any web page into a clean Markdown file with frontmatter — in just one click.

■ Key Features

- One-Click Conversion: Click the toolbar icon to instantly download the current web page as a Markdown file.
- Right-Click Menu: Right-click on any page and select "Save as Markdown" for quick saving.
- Smart Content Extraction: Powered by Mozilla's Readability.js, the same engine behind Firefox Reader View. Automatically removes ads, navigation bars, sidebars, footers, and other clutter — extracting only the article body.
- High-Quality Markdown: Turndown.js converts HTML to Markdown with support for headings, lists, links, bold, code blocks, tables, and more.
- YAML Frontmatter: Each file includes metadata (title, URL, date, domain) in YAML format at the top of the document.

■ Output Example

---
title: "Article Title"
url: "https://example.com/article"
date: 2026-05-17
domain: "example.com"
---

# Article Heading

The article body continues in Markdown format...

■ Customization

- Subfolder Setting: Choose a subfolder within your Downloads directory via the options page. For example, set "md-clipper" to save all files into a dedicated folder.
- Title Editing: Edit the article title in the popup before saving — this title is used for the filename.
- Preview: Review the converted Markdown in the popup before saving.
- Clipboard Copy: Instead of downloading, copy the Markdown text directly to your clipboard with one click.

■ Supported Formats

Turndown.js accurately converts the following HTML elements to Markdown:

- Headings (h1–h6) → ATX-style # syntax
- Paragraphs and line breaks
- Bold, italic, and strikethrough
- Ordered and unordered lists
- Links and images
- Fenced code blocks and inline code
- Blockquotes
- Tables (custom rule for Markdown table conversion)

■ Libraries Used

- Readability.js (Mozilla, Apache 2.0 License): The same library used in Firefox Reader View. Analyzes DOM structure to identify and extract article content with high accuracy.
- Turndown.js (MIT License): A JavaScript library for converting HTML to Markdown. Offers extensive options and custom rule support for high-quality output.

Both libraries are bundled within the extension package. No code is loaded from external servers.

■ Privacy & Security

- Fully Local Processing: All conversion happens entirely in your browser. No web page content is ever sent to any external server.
- Minimal Permissions: Only the minimum required permissions are used. The activeTab permission ensures access only when you explicitly activate the extension.
- No Data Collection: No personal information, browsing history, or behavioral data is collected, stored, or transmitted.
- Open Source: The full source code is available on GitHub for anyone to review.

■ Who Is This For?

- Anyone who wants to save blog posts and news articles in Markdown format
- Users of knowledge base tools like Obsidian, Notion, Logseq, or similar apps
- Developers who want to archive technical articles and documentation locally
- Researchers who want to clip web content efficiently in Markdown
- Anyone who wants clean article text without ads and sidebars

■ How to Use

1. Open the web page you want to save
2. Click the MD Clipper icon in the toolbar
3. A popup appears showing the article title and Markdown preview
4. Click "Save" to download the Markdown file to your Downloads folder

Alternatively, right-click anywhere on the page and select "Save as Markdown" for instant download.

■ Filename Format

Files are saved as "YYYY-MM-DD_Article-Title.md". The date is automatically added, making chronological organization easy. Invalid filename characters are automatically removed.

■ Multilingual Support

The UI supports both English and Japanese. It automatically switches based on your browser's language setting.

■ Open Source

MD Clipper is developed as open source. Bug reports and feature requests are welcome via the Issues section on the GitHub repository.
