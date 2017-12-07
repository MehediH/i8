chrome.browserAction.onClicked.addListener(function (tab) { 
  if (tab.url.indexOf("https://icons8.com/icon/") != -1) { 
      chrome.tabs.executeScript(tab.id, {
          "file": "contentscript.js"
      }, function () { 
          console.log("Script Executed .. ");
      });
  }
});