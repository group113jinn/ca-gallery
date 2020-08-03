var gId = 0;
var gCorrectAnswers = 0;
var gWrongAnswers = 0;
var gCurrQuestIdx = 0;
var gQuestsNumber = 3;
var gQuests = []
var gOpts = [
    ['Ant', 'Elephant'],
    ['Dog breath', 'Orange scent'],
    ['Sweet', 'Sour']
]
var gQuestion = ['Who is stronger?', 'What smell cats do not like?', 'What flavor cats cannot taste?'];
var gImgs = [
    ['<img src="img/ant.jpg">', '<img src="img/elephant.jpg">'],
    ['<img src="img/orange.jpg">', '<img src="img/dog.jpg">'],
    ['<img src="img/sweet.jpg">', '<img src="img/sour.jpg">']
];
var gCorrectOptIndexes = [0, 1, 0];

function init() {
    gQuests = createQuests();
    renderQuest(); 
}

function createQuest() {
    return {
        id: gId,
        opts: gOpts[gId],
        qst: gQuestion[gId],
        imgs: gImgs[gId],
        correctOptIndex: gCorrectOptIndexes[gId]
    }
}

function createQuests() {
    var questBox = [];
    for (var i = 0; i < gQuestsNumber; i++) {
        questBox.push(createQuest());
        gId++;
    }
    return questBox;
}


function renderQuest() {
    if (gCurrQuestIdx < gQuestsNumber) {
        document.querySelector('.main').innerHTML = '<div class="picDiv"><div class="pic1"></div><div class="pic2"></div><div class="info"></div></div><button class="first" onclick="checkAnswer(this)">first</button><button class="second" onclick="checkAnswer(this)">second</button>';
        document.querySelector('.first').innerHTML = gQuests[gCurrQuestIdx].opts[0];
        document.querySelector('.second').innerHTML = gQuests[gCurrQuestIdx].opts[1];
        document.querySelector('.info').innerHTML = gQuests[gCurrQuestIdx].qst;
        document.querySelector('.pic1').innerHTML = gQuests[gCurrQuestIdx].imgs[0];
        document.querySelector('.pic2').innerHTML = gQuests[gCurrQuestIdx].imgs[1];
    } else {
        document.querySelector('.main').innerHTML = '<div class="picDiv"><div class="pic1"></div><div class="pic2"></div><div class="info"></div><button class="restart" onclick="restart()">Play Again</button></div>';
        document.querySelector('.info').innerHTML = ' You got ' + gCorrectAnswers + ' out of ' + gQuestsNumber + ' correct!.' + '\nThat\'s ' + Math.round(gCorrectAnswers / (gQuestsNumber / 100)) + ' %.';
    }
}

function checkAnswer(optIdx) {
    if (optIdx.innerHTML === gQuests[gCurrQuestIdx].opts[gQuests[gCurrQuestIdx].correctOptIndex]) {
        gCorrectAnswers++
        gCurrQuestIdx++;
        renderQuest()
    } else {
        document.querySelector('.info').innerHTML = 'Wrong Answer!'
        document.querySelector('.info').innerHTML = 'Right answer is: ' + '  ' + gQuests[gCurrQuestIdx].opts[gQuests[[gCurrQuestIdx]].correctOptIndex]
        gWrongAnswers++;
        gCurrQuestIdx++;
        setTimeout(function() {
            renderQuest();
        }, 1500);
    }
}

function restart() {
    location.reload();
}