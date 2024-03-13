export function swDev () {
    const swURL = `${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swURL).then((response) => {
        console.warn("response", response);
    });
}