chrome.action.onClicked.addListener(function (tab) {
    /* matches both /icon/ and /icons/ */
  if (tab.url.indexOf("https://icons8.com/icon") != -1) { 
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['contentscript.js'],
    })
    .then(() => console.log("Script Executed .. "));
  }
});