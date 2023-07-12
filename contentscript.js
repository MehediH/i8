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

function downloadIcons8Svg(url, name){
    fetch(url)
      .then(resp => resp.blob())
      .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const iconDlElem = document.createElement('a');
          iconDlElem.style.display = 'none';
          iconDlElem.href = url;
          iconDlElem.download = name;
          document.body.appendChild(iconDlElem);
          iconDlElem.click();
          window.URL.revokeObjectURL(url);
          delete iconDlElem;
      })
      .catch(() => alert('Download failed, please try again.'));
}

function getSvgUrl(url) {
    let parsedUrl = new URL(url);
    parsedUrl.searchParams.set('format', 'svg');
    return parsedUrl.toString();
}

function getSelectedIconName() {
    let openCanvases = document.getElementsByClassName("app-accordion2__icon-preview");
    if (openCanvases.length == 0) {
        return "icon";
    }
    
    let bigCanvas = openCanvases[0];
    let link = bigCanvas.querySelector("a");
    let url = link.getAttribute("href");
    let iconName = url.substring(url.lastIndexOf("/") + 1); 
    return iconName;
}

function tryToDownloadSelectedIcon() {
    let originalIconUrl = findSelectedIconUrl();
    if (originalIconUrl == null) {
        alert("Please select one icon before trying to download it.");
        return;
    }
    let svgUrl = getSvgUrl(originalIconUrl);
    let iconName = getSelectedIconName() + ".svg";
    downloadIcons8Svg(svgUrl, iconName);
}

tryToDownloadSelectedIcon();