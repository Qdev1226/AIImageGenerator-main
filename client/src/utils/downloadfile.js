function toDataURL(url) {
    return fetch(url)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            return URL.createObjectURL(blob);
        });
}

async function download(url) {
    const a = document.createElement("a");
    a.href = await toDataURL('https://cors-anywhere.herokuapp.com/' + url);
    const fileNames = url.split('/');
    const fileName = fileNames[fileNames.length - 1];
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

export default download;