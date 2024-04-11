((win) => {
    if (win) {

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentBoxSize) {
                    const heightContent = entry.borderBoxSize[0].blockSize;

                    const send = {
                        detail: {
                            height: heightContent
                        }
                    }
                   
                    const parentUrl = document.referrer

                    const hosts = [
                        "http://localhost:3012/", 
                        "https://www.apuestatotal.com/", 
                        "https://calimaco.apuestatotal.dev/"
                    ]

                    if (hosts.indexOf(parentUrl) > -1) {
                        win?.parent.top?.postMessage(send, parentUrl)
                    }
                }
            }
        });

        const divContent = win.document.querySelector("body")

        resizeObserver.observe(divContent)
    }

})(window)