((win) => {
    if (win) {
        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    // console.log(entry);
                    const heightContent = entry.borderBoxSize[0].blockSize;
                    // console.log("heightContent", heightContent);
                    const send = {
                        detalleHtml: {
                            height: heightContent
                        }
                    }
                    // win.parent.top.
                    win?.parent.top?.postMessage(send, "https://my-app-main.vercel.app/")
                }
            }
        });

        const divContent = win.document.querySelector("body")

        resizeObserver.observe(divContent)
    }

})(window)