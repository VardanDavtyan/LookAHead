//Converting Text To Array`
var text = str
var punctuationless = text.replace(/[\/#.!$%\^&\*;,:{}=\_~()]/g, " ")
text = punctuationless.replace(/\s{2,}/g, " ")
var t = text.split(" ")
var i = 0

//Check When Text is Ending/Starting`
function check() {
    if (i >= t.length) {
        i = 0
        setTimeout(() => {
            alert("Text Ends!")
            p.innerHTML = t[i]
        }, 75)
    } else if (i < 0) {
        i = t.length - 1;
        p.innerHTML = t[i]
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
p.innerHTML = t[i]

var container = document.getElementsByClassName("container")
var div = document.getElementById("someButton")
//hmi imast chka esi dnel!!! es takiny`
//container[0].appendChild(p)
document.body.appendChild(p)

//See All Text`
p.onclick = function () {
    alert(`Your Inputed Text: ${text}`)
}

//Changing Text`
function changeText() {
    text = prompt('Change Text: ');
    localStorage.removeItem('text')
    localStorage.setItem('text', text)

    text = text.toLowerCase()

    punctuationless = text.replace(/[\/#.!$%\^&\*;,:{}=\_`~()]/g, ' ');
    text = punctuationless.replace(/\s{2,}/g, ' ');
    t = text.split(' ');
    i = 0;

    if (p != null){
        p.innerHTML = t[i];
    }
}

//Changing Language by lang-code`
function changeLanguage(){
    language = prompt('Enter Language Code:')
    recognizer.lang = language;
}

//Scrolling`
function scrollingText() {
    $('body').on('DOMMouseScroll mousewheel', function (event) {
        if (event.originalEvent.detail > 0 || event.originalEvent.wheelDelta < 0) {
            if (i >= 0) {
                p.innerHTML = t[--i]
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
//Recognizeri Sharunakvely`
//recognizer.continuous = true

recognizer.onresult = function (event) {
    var result = event.results[event.resultIndex]
    //if (result.isFinal) {
        for (var i = 0; i < text.length; i++) {
            if (result[0].transcript/*[0]*/ == t[i]/*[0]*/) {
                console.log('Result: ', t[i++])
                p.innerHTML = t[i++]
                check()
                break
            }
        }
    //} else {
        console.log('RealTime Result: ', result[0].transcript)
       // console.log("not ")
   // }
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
var timeNumber
function doSomething() {
    if (a % 2 == 0) {
        timeNumber = prompt("Enter Second Of Slide Speed: ")   
        while (timeNumber == null || timeNumber == "" || !Number(timeNumber)) {
            timeNumber = prompt("Enter Second Of Slide Speed: ")
        }
        ms = Number(timeNumber)
        div.innerHTML = "stop time"
        interval = setInterval(() => { p.innerHTML = t[i++]; check() }, ms*1000)
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
        p.innerHTML = t[--i]
        check()
    }

    if (e.keyCode == '39') {
        // right arrow
        p.innerHTML = t[i++]
        check()
    }
    else if (e.keyCode == '37') {
        // left arrow
        p.innerHTML = t[--i]
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
        p.innerHTML = t[--i]
        check()
    }

    if (e.code == 'KeyD') {
        // right arrow
        p.innerHTML = t[i++]
        check()
    }
    else if (e.code == 'KeyA') {
        // left arrow
        p.innerHTML = t[--i]
        check()
    }

    //On Space Clicking`
    if (e.keyCode == 32) {
        p.innerHTML = t[i++]
        check()
    }
})
