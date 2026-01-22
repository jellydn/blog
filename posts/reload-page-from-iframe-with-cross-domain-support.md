---
date: "09/10/2021 7:06 PM +0800"
tag:
  - react
  - iframe
  - website
author: Dung Huynh
hero_image: ""
title: Reload page from iframe with cross-domain support
description: Trigger parent page reload from iframe
_template: post
---

## Context

When an iframe is cross-domain, direct parent access is blocked. Use `postMessage` API with a message listener to communicate between iframe and parent.

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
