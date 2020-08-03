'use strict'
var gId;
var gLevel;
var gBoard;
var gNums;
var standartNums;
var gStartTime;


function init() {
     gLevel = 4;
     gNums = [];
     standartNums = [];
     gStartTime = [];
    console.log("g",gNums);
    getNums();
    nextNumber()
    gBoard = createTable(gLevel)
    renderTable(gBoard)
}


function createTable(level) {
    var board = [];
    var counter = 0;
    for (var i = 0; i < level; i++) {
        board[i] = []
        for (var j = 0; j < level; j++) {
            board[i][j] = { id: gId += 1, isHit: false, value: gNums[counter] };
            counter++;
        }
    }

    return board;
}

function renderTable(printboard) {
    var htmlStr = '';
    var counter = 0;
    for (var i = 0; i < printboard.length; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < printboard.length; j++) {
            htmlStr += '<td class="cell" onclick="targetCell(this)" data-i="' + i + '" data-j="' + j + '">' + gNums[counter] + '</td>';
            counter++;
        }
        htmlStr += '</tr>';
    }
    var tplace = document.querySelector('.tboard');
    tplace.innerHTML = htmlStr;
}


function targetCell(hitCell) {
  
    gStartTime.push(Date.now())
    var coordinates = hitCell.dataset;
    var position = { i: +coordinates.i, j: +coordinates.j };
    var cell = gBoard[position.i][position.j];
    if (cell.value !== standartNums[0]) {
        return;
    } else {
        standartNums.shift();
        hitCell.classList.add('hit');
        nextNumber()
        if (standartNums.length === 0) {
           var gEndTime = Date.now()
            var gameTime = (gEndTime - gStartTime[0])/1000;
              document.querySelector('.infoTime').innerHTML =  gameTime + ' seconds.';
              document.querySelector('.infoNum').innerHTML = "Start New Game"
            setTimeout(function() {
                alert('Winner!')
            }, 300)
        }
    }


}

function levelSetting(level) {
    gId;
    gLevel = 4;
    gBoard;
    gNums = [];
    standartNums = [];
    gLevel = level.value
    init();

}


function getNums() {

    for (var i = 1; i <= gLevel ** 2; i++) {
        standartNums.push(i);
    }
    randomized(standartNums)
}

function randomized(nums) {
    var randomArray = nums.slice();
    for (var i = randomArray.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var swap = randomArray[i];
        randomArray[i] = randomArray[j];
        randomArray[j] = swap;
    }
    gNums = randomArray.slice()
    randomArray = null;
}


function nextNumber() {
    document.querySelector('.infoNum').innerHTML = ' Next number : ' + standartNums[0];
}