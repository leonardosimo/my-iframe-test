(function (wind) {

    const AT_child = () => {
        let ctxAt = {}
        ctxAt["onHeight"] = (callback, error) => {
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

                        const parentUrl = document.referrer

                        const hosts = [
                            "http://localhost:3001/",
                            "https://www.apuestatotal.com/",
                            "https://calimaco.apuestatotal.dev/"
                        ]

                        if (hosts.indexOf(parentUrl) > -1) {
                            callback({ send, parentUrl })
                        } else {
                            error("el host no esta permitido")
                        }

                    }
                }
            });


            const divContent = wind.document.querySelector("body")

            resizeObserver.observe(divContent)
        }

        return ctxAt
    }
    const AT_page = () => {
        const ctxAt = {
            hosts: [
                "http://localhost:3012/",
                "http://localhost:3000/",
                "https://www.apuestatotal.com/",
                "https://calimaco.apuestatotal.dev/"
            ],
            closeMss() {
                wind.removeEventListener("message", null, false)
            },
            onHeight(callback) {
                const self = this
                wind.addEventListener('message', function (event) {
                    if (self.hosts.indexOf(event.origin) === -1) return null;
                    if (typeof event.data === "object" && !event.data?.detail) return null;
                    const send = {
                        height: (event.data?.detail.height)
                    }
                    const nameCustomEvent = "onHeight-" + event.origin
                    const custonSend = new CustomEvent(nameCustomEvent, send);
                    // enviar 
                    wind.dispatchEvent(custonSend);
                    // enviar
                    callback(
                        send
                    );
                }, false)
            },
        }

        return ctxAt
    }

    // lib: child | page
    // option : { host:  }
    const AT = (libKey, option = {}) => {
        // init defaul context
        const lib = {
            child: AT_child,
            page: AT_page
        }

        return lib[libKey](option)
    }

    wind.AT = AT
})(window)