function findSelectedIconUrl() {
    let openCanvases = document.getElementsByClassName("app-accordion2__icon-preview");
    if (openCanvases.length == 0) {
        return null;
    }

    let bigCanvas = openCanvases[0];
    let icon = bigCanvas.querySelector("img");
    let url = icon.getAttribute("srcset").split(" ")[0];
    return url;
}

function getSvgMetadataUrl(url) {
    // FROM: https://img.icons8.com/?size=512&id=mHBlzWfNFiEi&format=png 
    // TO:   https://api-icons.icons8.com/siteApi/icons/icon?id=mHBlzWfNFiEi&svg=true
    let parsedUrl = new URL(url);
    let iconId = parsedUrl.searchParams.get("id");
    
    let svgMetadataUrl = new URL("https://api-icons.icons8.com/siteApi/icons/icon?svg=true");
    svgMetadataUrl.searchParams.set("id", iconId);
    return svgMetadataUrl.toString();
}

function downloadSVGFromBase64(base64Data, fileName) {
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/svg+xml" });

    const url = window.URL.createObjectURL(blob);
    const iconDlElem = document.createElement("a");
    iconDlElem.style.display = 'none';
    iconDlElem.href = url;
    iconDlElem.download = fileName;
    document.body.appendChild(iconDlElem);
    iconDlElem.click();
    window.URL.revokeObjectURL(url);
    delete iconDlElem;
}

function downloadIcons8Svg(url) {
    fetch(url)
        .then(resp => resp.json())
        .then(json => {
            console.log(json);
            let svgData = json.icon.svg;
            let iconName = json.icon.commonName;
            let iconFileName = iconName + ".svg";
          
            downloadSVGFromBase64(svgData, iconFileName);
      })
      .catch(() => alert('Download failed, please try again.'));
}

function tryToDownloadSelectedIcon() {
    let originalIconUrl = findSelectedIconUrl();
    if (originalIconUrl == null) {
        alert("Please select one icon before trying to download it.");
        return;
    }
    let svgMetadataUrl = getSvgMetadataUrl(originalIconUrl);
    downloadIcons8Svg(svgMetadataUrl);
}

tryToDownloadSelectedIcon();