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

When your iframe loads a page from a different domain, the browser blocks direct access to `window.parent.location` — the same-origin policy prevents cross-domain DOM reads. Instead, you send a message from the iframe with `window.parent.postMessage` and listen for it on the parent page to trigger a reload.

## Usage

**Inside iframe (sender):**

```typescript
<button onClick={() => window.parent.postMessage("reload-page", "*")}>
  Reload Parent
</button>
```

**In parent page (receiver):**

```typescript
useEffect(() => {
  const listener = (event: MessageEvent) => {
    // TODO: Verify event.origin for security
    if (event.data === "reload-page") {
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

**Security:** Replace `"*"` with specific origin in production.
