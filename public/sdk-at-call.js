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
                                height: heightContent,
                                baseUrl: wind.location.href
                            }
                        }

                        const hosts = [
                            "http://localhost:3001/",
                            "https://www.apuestatotal.com/",
                            "https://calimaco.apuestatotal.dev/",
                            "https://my-iframe-test.vercel.app/",
                            "https://my-app-main.vercel.app/"
                        ]
                        const parentUrl = document.referrer
                        if (!parentUrl) {
                            error("no se esta llamado desde una pagina externa")
                            return;
                        }

                        const originRef = `${new URL(parentUrl).origin}/`

                        if (hosts.indexOf(originRef) === -1) {
                            error("el host no esta permitido")
                            return;
                        }

                        callback({ send, parentUrl })

                    }
                }
            });


            const divContent = wind.document.querySelector("body")

            resizeObserver.observe(divContent)
        }

        return ctxAt
    }
    const AT_page = (option) => {
        const ctxAt = {
            ID_FRAME: "",
            nameCustomEvent: null,
            hosts: [
                "http://localhost:3012/",
                "http://localhost:3000/",
                "https://www.apuestatotal.com/",
                "https://calimaco.apuestatotal.dev/",
                "https://my-iframe-test.vercel.app/",
                "https://my-app-main.vercel.app/"
            ],

            start() {
                try {
                    this.ID_FRAME = option.id;
                    this.SRC_FRAME = option.src;
                    this["nameCustomEvent"] = `height-${this.ID_FRAME}`;

                    const self = this
                    function handleMessage(event) {
                        const uriInfo = new URL(event.origin);

                        if (self.hosts.indexOf(`${uriInfo.origin}/`) === -1) return null;
                        // console.log(self.SRC_FRAME, event.data?.detail.baseUrl);

                        if (typeof event.data === "object" && !event.data?.detail) return null;

                        const src_frame_origin = new URL(self.SRC_FRAME).origin + self.ID_FRAME
                        const detail_baseUrl_origin = new URL(event.data?.detail.baseUrl).origin + self.ID_FRAME
                        if (src_frame_origin === detail_baseUrl_origin) {
                            const send = {
                                detail: {
                                    height: event.data?.detail.height
                                }
                            }

                            // se crear el evento CustomEvent
                            const custonSend = new CustomEvent(self["nameCustomEvent"], send);
                            // enviar 
                            wind.dispatchEvent(custonSend);
                        }
                    }
                    // Verificar si ya existe un event listener para el evento 'message' en window
                    // Agregar el event listener si no existe
                    if (window.handleMessage) {
                        window.removeEventListener('message', handleMessage, false);
                    }
                    window.addEventListener('message', handleMessage, false);

                } catch (error) {
                    console.log("error AT start :: ", error);
                }

            },
            closeMss() {
                wind.removeEventListener("message", null, false)
            },
        }
        ctxAt.start(option)
        return ctxAt
    }

    // lib: child | page
    // option : { host:  }
    const AT = (libKey, option = {}) => {
        try {
            // init defaul context
            const lib = {
                child: AT_child,
                page: AT_page
            }

            return lib[libKey](option)
        } catch (error) {
            console.log("error", error);
        }
    }

    wind.AT = AT
})(window)