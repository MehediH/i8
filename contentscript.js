var icon = document.getElementsByClassName("icon-sidebar")[0]

var iconName = icon.getElementsByClassName("title")[0].innerHTML.replace(/[^A-Z0-9]/ig, "_").toLowerCase()

var icon = icon.getElementsByClassName("app-icon")[0]
var icon = icon.getElementsByTagName("svg")[0].outerHTML


var iconDlElem = document.createElement('a');

var blob = new Blob([icon], {type : "text/plain;charset=UTF-8"});
iconDlElem.href = window.URL.createObjectURL(blob);

iconDlElem.download = iconName + ".svg";
iconDlElem.style.display = 'none';
document.body.appendChild(iconDlElem);

iconDlElem.click(); 
delete iconDlElem;