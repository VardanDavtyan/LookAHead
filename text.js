//Entering The Text
var webSiteTitle = document.getElementsByTagName('TITLE')[0].text
var str

//Page Reload Count
var state = history.state || {};
var reloadCount = state.reloadCount || 0;
if (performance.navigation.type === 1) { // Reload
    state.reloadCount = ++reloadCount;
    history.replaceState(state, null, document.URL);
} else if (reloadCount) {
    reloadCount = 0;
    delete state.reloadCount;
    history.replaceState(state, null, document.URL);
}

if (reloadCount == 0){
    alert("If you don't now how to use this project\nthan click to instruction link!")
}

//Looping Set Text...
if (webSiteTitle == "Text Helper") {
    str = prompt("Enter Your Long Text: ")

    while (str == null || str == "") {
        str = prompt("Your Text is Not Entered!\nEnter Your Text: ")
    }

    str = str.toLowerCase()
}

//Set Current Text in Local Storage
localStorage.setItem('text', str)