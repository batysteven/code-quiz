const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questions = [
    
]

function startGame() {
    startButton.classList.add('hide');
    questionContainerElement.classList.remove('hide');
};

function selectAnswer() {

};

startButton.addEventListener('click', startGame);