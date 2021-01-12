'use strict';

let myCards = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8' , 'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8' ];
const rowCount=4;
const colCount=4;
let matchedPairs = 0;
let moveCount=0;
const totalPairs=8;
var openedCard = undefined;
var openedCard2 = undefined;
var skipClick=true;
var gameRunning=false;
var myTimer;

let matchLabel = document.getElementById("matchPairs");
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let btnStart = document.getElementById("btnStart");
let bestTime = document.getElementById("bestTime");
let modal = document.getElementById("popup_id")
let totalSeconds = 0;
let bestSeconds = 3599;

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}


function toggle(param)
{
    if (skipClick)return;
    var div = param;
    if (div.classList.contains('flip')) {
        

    } else {
        div.classList.add('flip');
        if (!(openedCard))
        {
            openedCard=div;
        }
        else
        {
            moveCount++;
            var s1 = openedCard.getElementsByClassName('cardImage');
            var s2 = div.getElementsByClassName('cardImage');
            if(s1[0].src==s2[0].src)
            {
                openedCard=undefined;
                openedCard2=undefined;
                matchedPairs++;
                matchLabel.innerHTML=matchedPairs;
                if(matchedPairs==totalPairs)
                {
                    //Completed
                    
                    //SHOW POPUP WINDOW

                    clearInterval(myTimer);
                    winner();
                }
            }
            else{
                openedCard2=div;
                skipClick=true;
                setTimeout(unMatch,1000);
            }
        }

    }
}

function unMatch()
{
    openedCard.classList.remove('flip');
    openedCard2.classList.remove('flip');
    openedCard=undefined;
    openedCard2=undefined;
    setTimeout(allowClick,200);
}

function allowClick()
{
    skipClick=false;
}

function shuffleArray(array) {
    
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    var div = document.getElementsByClassName('cardImage');
    for(var i=0; i<div.length; i++)
    {
        div[i].src="image/" + array[i] + ".png";
    }
    
}

function showAll()
{
    var div = document.getElementsByClassName('flip-container');
    for(var i=0; i<div.length; i++)
    {
        div[i].classList.add('flip');
    }

}

function hideAll()
{
    var div = document.getElementsByClassName('flip-container');
    for(var i=0; i<div.length; i++)
    {
        div[i].classList.remove('flip');
    }
    skipClick=false;
    if(gameRunning)
    {
        totalSeconds=0;
        myTimer = setInterval(setTime, 1000);
    }
}
function winner()
{
    var tm = minutesLabel.innerHTML + ":" + secondsLabel.innerHTML;
    if (totalSeconds<bestSeconds)
    {
        document.getElementById("highRecord").classList.add("show");
        bestTime.innerHTML=tm;
        bestSeconds=totalSeconds;
    }
    modal.classList.add("show");
    document.getElementById("finalMove").innerHTML = moveCount;
    document.getElementById("totalTime").innerHTML = tm;
    document.getElementById("newRecord").innerHTML = tm;
}
function closePopup()
{
    stopGame();
    modal.classList.remove("show");
    document.getElementById("highRecord").classList.remove("show");
}

function onLoad()
{
    var htmlCode="";
    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < colCount; j++) {
            htmlCode += `
                <div class="flip-container" onclick="toggle(this);">
                    <div class="flipper">
                        <div class="front"></div>
                        <div class="back"><img class="cardImage"/></div>
                    </div>
                </div>
            `;
        }
    }
    document.getElementById("container").innerHTML=htmlCode;
}

function stopGame()
{
    gameRunning=false;
    btnStart.innerHTML="New Game";
    hideAll();
    skipClick=true;
    clearInterval(myTimer);
    totalSeconds=0;
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
}

function execute() {
    if(gameRunning)
    {
        stopGame();
    }
    else
    {
        gameRunning=true;
        btnStart.innerHTML="Stop Game";
        matchedPairs=0;
        moveCount=0;
        shuffleArray(myCards);
        showAll();
        setTimeout(hideAll,3000);
    }
}