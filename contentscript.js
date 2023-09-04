function findSelectedIconUrl() {
    const openCanvases = document.querySelectorAll(".app-accordion2__icon-preview");
    if (!openCanvases.length) {
        return null;
    }

    const bigCanvas = openCanvases[0];
    const icon = bigCanvas.querySelector("img");
    return icon.getAttribute("srcset").split(" ")[0];
}

function getSvgMetadataUrl(url) {
    // FROM: https://img.icons8.com/?size=512&id=mHBlzWfNFiEi&format=png
    // TO:   https://api-icons.icons8.com/siteApi/icons/icon?id=mHBlzWfNFiEi&svg=true
    const parsedUrl = new URL(url);
    const iconId = parsedUrl.searchParams.get("id");

    const svgMetadataUrl = new URL("https://api-icons.icons8.com/siteApi/icons/icon?svg=true");
    svgMetadataUrl.searchParams.set("id", iconId);
    return svgMetadataUrl.toString();
}

function downloadSVGFromBase64(base64Data, fileName) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = Array.from(byteCharacters).map(char => char.charCodeAt(0));
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/svg+xml" });

    const url = window.URL.createObjectURL(blob);
    const iconDlElem = document.createElement("a");
    iconDlElem.href = url;
    iconDlElem.download = fileName;
    document.body.appendChild(iconDlElem);
    iconDlElem.click();
    document.body.removeChild(iconDlElem);
    window.URL.revokeObjectURL(url);
}

function downloadIcons8Svg(url) {
    fetch(url)
        .then(resp => resp.json())
        .then(json => {
            const svgData = json.icon.svg;
            const iconName = json.icon.commonName;
            const iconFileName = `${iconName}.svg`;
            downloadSVGFromBase64(svgData, iconFileName);
        })
        .catch(() => alert('Download failed, please try again.'));
}

function tryToDownloadSelectedIcon() {
    const originalIconUrl = findSelectedIconUrl();
    if (!originalIconUrl) {
        alert("Please select one icon before trying to download it.");
        return;
    }
    const svgMetadataUrl = getSvgMetadataUrl(originalIconUrl);
    downloadIcons8Svg(svgMetadataUrl);
}

tryToDownloadSelectedIcon();