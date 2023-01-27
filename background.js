chrome.action.onClicked.addListener(function (tab) { 
  if (tab.url.indexOf("https://icons8.com/icon/") != -1) { 
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['contentscript.js'],
    })
    .then(() => console.log("Script Executed .. "));
  }
});