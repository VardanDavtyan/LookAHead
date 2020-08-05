alert("If you don't now how to use this project\nthan click to instruction link!")

//Converting Text To Array`
var text = str
var punctuationless = text.replace(/[\/#.!$%\^&\*;,:{}=\-_`~()]/g, " ")
text = punctuationless.replace(/\s{2,}/g, " ")
var t = text.split(" ")
var i = 0

function check() {
    if (i >= t.length) {
        alert("Text Ends!")
        i = 0
    }
}

//Language Variable for Recognizing`
var language = 'en-En'

//Setting Language in ListBox`
function setLanguage() {
    language = document.getElementById('listlang').value
    recognizer.lang = language
    language.style.outline = "none"
}


//Creating API`
var p = document.createElement('p')
p.style.fontSize = 100 + 'px'
p.style.display = 'flex'
p.style.justifyContent = 'center'

var container = document.getElementsByClassName("container")
var div = document.getElementById("someButton")
//container[0].appendChild(p)
document.body.appendChild(p)

//See All Text`
p.onclick = function () {
    alert(`Your Inputed Text: ${text}`)
}

//Scrolling`
function scrollingText() {
    $('body').on('DOMMouseScroll mousewheel', function (event) {
        if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
            if (i >= 0){
                p.innerHTML = t[i--] 
                check()
            }
        } else if (i < t.length) {
            p.innerHTML = t[i++]
            check()
        }
        return false
    })
}

//Voice Recognising`
var recognizer = new webkitSpeechRecognition()
recognizer.interimResults = true
recognizer.lang = language

recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex]
    if (result.isFinal) {
        for (var i = 0; i < text.length; i++) {
            if (result[0].transcript[0] == t[i][0]) {
                console.log(t[i++])
                p.innerHTML = t[i++]
                check()
            }
        }
    } else {
        console.log('RealTime Result: ', result[0].transcript)
    }
}

//Recognize Functions`
function speech() {
    recognizer.start()
}

var synth = window.speechSynthesis
var utterance = new SpeechSynthesisUtterance(`How about we say this now? This is quite a long sentence to say. Say me Something.`)

function talk() {
    synth.speak(utterance)
}
function stop() {
    synth.pause()
}

//When Load Default Scrolling`
scrollingText()


//Set Timing`
var a = 0
var interval = null
function doSomething() {
    if (a % 2 == 0) {
        var ms = parseInt(prompt("Enter MiliSecond Of Slide Speed: "))
        div.innerHTML = "stop time"
        interval = setInterval(() => { p.innerHTML = t[i++]; check() }, ms)
    } else {
        clearInterval(interval, 1)
        div.innerHTML = "set time"
        scrollingText()
        check()
    }
    a++
}

//Left and Right Keys Arrowing`
window.addEventListener('keydown', function (e) {

    if (e.keyCode == '38') {
        // up arrow
        p.innerHTML = t[i++]
        check()
    }
    else if (e.keyCode == '40') {
        // down arrow
        p.innerHTML = t[i--]
        check()
    }

    if (e.keyCode == '39') {
        // right arrow
        p.innerHTML = t[i++]
        check()
    }
    else if (e.keyCode == '37') {
        // left arrow
        p.innerHTML = t[i--]
        check()
    }

    //WASD Keys Pressing
    if (e.code == 'KeyW') {
        // up arrow
        p.innerHTML = t[i++]
        check()
    }
    else if (e.code == 'KeyS') {
        // down arrow
        p.innerHTML = t[i--]
        check()
    }

    if (e.code == 'KeyD') {
        // right arrow
        p.innerHTML = t[i++]
        check()
    }
    else if (e.code == 'KeyA') {
        // left arrow
        p.innerHTML = t[i--]
        check()
    }

    //On Space Clicking`
    if (e.keyCode == 32) {
        p.innerHTML = t[i++]
        check()
    }
})
