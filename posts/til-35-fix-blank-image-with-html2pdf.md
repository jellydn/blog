---
date: 12/31/2022 11:47 PM +0800
tag:
    - html2pdf
    - threadify
author: Dung Huynh
hero_image: '/static/til.jpeg'
title: '#TIL 35 - Fix blank image with html2pdf'
description:
    HTML2PDF is quite popular tool for convert html2pdf from client side.
    However, I run into this issue with blank image.
---

HTML2PDF is quite popular tool for convert html2pdf from client side. However, I run into this issue with blank image. It is a bit surprise as the document doesn't mention about this one. I've searched on Github issues and found out that's common issue. The default is rendering image from same domain.

Below is the way I've fixed for Threadify+ app which I'm working on recently.

    const downloadPdfFile = async (id?: string) => {
      const element = document.getElementById("thread");
      const opt = {
        filename: `${id}-${Date.now()}.pdf`,
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        html2canvas: { scale: 2, useCORS: true }, // Allow to render image from different domain
      };

      // @ts-expect-error global html2pdf from CDN
      return window.html2pdf().set(opt).from(element).save();
    };

More detail on \[feat: add pdf download button · jellydn/threadify-plus@5b5327b\]([https://github.com/jellydn/threadify-plus/commit/5b5327b4d407db1b98bcf5ffd90dcfa80a35deb4](https://github.com/jellydn/threadify-plus/commit/5b5327b4d407db1b98bcf5ffd90dcfa80a35deb4 'https://github.com/jellydn/threadify-plus/commit/5b5327b4d407db1b98bcf5ffd90dcfa80a35deb4'))
