---
date: "09/10/2021 7:06 PM +0800"
tag:
  - react
  - iframe
  - website
author: Dung Huynh
hero_image: ""
title: Reload page from iframe with cross-domain support
description: "Reload the parent page from a cross-origin iframe using window.postMessage"
_template: post
---

## Context

When your iframe loads a page from a different domain, the browser blocks direct access to `window.parent.location` — the same-origin policy prevents cross-domain DOM reads. Instead, you send a message to the parent page with `window.parent.postMessage`, using the parent's exact origin, and verify the iframe's origin before reloading.

## Usage

**Inside iframe (sender):**

```typescript
const parentOrigin = "https://parent.example.com";

<button onClick={() => window.parent.postMessage("reload-page", parentOrigin)}>
  Reload Parent
</button>
```

**In parent page (receiver):**

```typescript
useEffect(() => {
  const iframeOrigin = "https://iframe.example.com";

  const listener = (event: MessageEvent) => {
    if (event.origin === iframeOrigin && event.data === "reload-page") {
      window.location.reload();
    }
  };

  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
}, []);
```

```tsx
<iframe
  src="https://your-iframe-url.com"
  sandbox="allow-same-origin allow-scripts"
/>
```
