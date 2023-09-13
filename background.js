chrome.action.onClicked.addListener(function (tab) {
    const allowedDomain = "https://icons8.com";
    if (!tab.url || tab.url.indexOf(allowedDomain) == -1) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icons/icon19.png',
            title: 'Domain not allowed',
            message: 'You can use this extension only on the icons8.com website.'
        });
        return;
    }

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['contentscript.js'],
    })
    .then(() => console.log("Script Executed .. "));
});