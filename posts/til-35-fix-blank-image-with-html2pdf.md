---
date: "12/31/2022 11:47 PM +0800"
tag:
  - html2pdf
  - threadify
author: Dung Huynh
hero_image: /static/til.jpeg
title: "#TIL 35 - Fix blank image with html2pdf"
description: Fix cross-origin images in html2pdf
_template: post
---

## What

Fix blank images when converting HTML to PDF with html2pdf.js.

## Why

html2pdf blocks cross-origin images by default for security.

## How

Enable CORS in html2canvas options:

```typescript
const element = document.getElementById("thread");

window.html2pdf()
  .set({
    filename: `${id}-${Date.now()}.pdf`,
    html2canvas: {
      scale: 2,
      useCORS: true, // Allow cross-origin images
    },
  })
  .from(element)
  .save();
```
