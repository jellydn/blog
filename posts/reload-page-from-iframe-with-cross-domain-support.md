---
date: 09/10/2021 7:06 PM +0800
tag:
    - react
    - iframe
    - website
author: Dung Huynh
hero_image: ''
title: Reload page from iframe with cross-domain support
description:
    On this tutorial, I will share with you a trick to reload parent website
    from iframe
---

Hi there,

This demo use React as a demonstration but it should work the same for other UI framework or with vanilla JS.

At first, we will send a message from the iframe to the parent.

    function App() {
      return (
        <div className="App">
          <header className="App-header">
            <p>Reload Iframe Example</p>
            <p>
              <button
                type="button"
                onClick={() => {
                  window.parent.postMessage("reload-page", "*");
                }}
              >
                Reload
              </button>
            </p>
          </header>
        </div>
      );
    }

Then from a UI component, we will use `useEffect` to listen to messages from Iframe.

    useEffect(() => {
        const listener = (event: any) => {
          // TODO: check origin source for security
          if (event.data === 'reload-page') {
            window.location.reload();
          }
        };

        // listen to reload message on iframe
        window.addEventListener('message', listener);

        return () => {
          // clean listener
          window.removeEventListener('message', listener);
        };
      }, []);

      return (
         <iframe
              title="Trading System"
              src={`https://reload-iframe-example.vercel.app`}
              sandbox="allow-same-origin allow-scripts"
            />
       );

That's all :) Cheer.
