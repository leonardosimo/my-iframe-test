((win) => {
    if (win) {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    // console.log(entry);
                    const heightContent = entry.borderBoxSize[0].blockSize;
                    // console.log("heightContent", heightContent);
                    const send = {
                        detail: {
                            height: heightContent
                        }
                    }
                    console.log(send);
                    // win.parent.top.
                 
                    const event = new CustomEvent('myCustomEvent', send);
                    
                    win?.parent.top?.dispatchEvent(event);
                    
                    // win?.parent.top?.postMessage(send, "http://localhost:3001/")
                }
            }
        });

        const divContent = win.document.querySelector("body")

        resizeObserver.observe(divContent)
    }

})(window)