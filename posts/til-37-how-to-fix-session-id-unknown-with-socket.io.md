---
date: 02/23/2023 7:19 PM +0800
tag:
- Session ID unknown
- socket.io
author: Dung Huynh
hero_image: ''
title: "#TIL 37 - How to fix Session ID unknown with socket.io"
description: Without enabling sticky-session, you will experience HTTP 400 errors
  due to "Session ID unknown"

---
If you're using Socket.io in your web application, you may encounter an issue where the Session ID is unknown. The solution is disabling HTTP long-polling and using only WebSockets for communication between the client and server.

    // client-side
    const socket = io({
      transports: ["websocket"] // HTTP long-polling is disabled
    });

The root cause is enabling "sticky session" if HTTP long-polling is enabled (which is the default). You can read more about why sticky sessions are required and how to implement them in the Socket.io documentation: [**https://socket.io/docs/v4/using-multiple-nodes/#why-is-sticky-session-required**](https://socket.io/docs/v4/using-multiple-nodes/#why-is-sticky-session-required "https://socket.io/docs/v4/using-multiple-nodes/#why-is-sticky-session-required")