((win) => {
    if (win) {

        const refAt = win.AT("child", {});

        refAt.onHeight((data) => {
            win?.parent.top?.postMessage(data.send, data.parentUrl)
        }, error => {
            console.log(error);
        })

    }

})(window)