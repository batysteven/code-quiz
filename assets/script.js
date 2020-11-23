const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let randomQuestions, answeredQuestionIndex;
const questions = [
    {
        question: 'This is a question a',
        answers: [
            { text: 'not answer', correct: false},
            { text: 'is answer', correct: true},
            { text: 'not answer', correct: false},
            { text: 'not answer', correct: false} 
        ]
    },
    {
        question: 'This is a question b',
        answers: [
            { text: 'is answer', correct: true},
            { text: 'not answer', correct: false},
            { text: 'not answer', correct: false},
            { text: 'not answer', correct: false} 
        ]
    },
    {
        question: 'This is a question c',
        answers: [
            { text: 'not answer', correct: false},
            { text: 'not answer', correct: false},
            { text: 'not answer', correct: false},
            { text: 'is answer', correct: true},
        ]
    },
    {
        question: 'This is a question d',
        answers: [
            { text: 'not answer', correct: false},
            { text: 'not answer', correct: false},
            { text: 'is answer', correct: true},
            { text: 'not answer', correct: false} 
        ]
    },
    {
        question: 'This is a question e',
        answers: [
            { text: 'is answer', correct: true},
            { text: 'not answer', correct: false},
            { text: 'not answer', correct: false},
            { text: 'not answer', correct: false} 
        ]
    }
];

function startGame() {
    startButton.classList.add('hide');
    randomQuestions = questions.sort(() => Math.random() - .5);
    answeredQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
};

function setNextQuestion() {
    showQuestion(randomQuestions[answeredQuestionIndex]);
};

function showQuestion(question) {
    questionElement.innerText = question.question;
};

function selectAnswer() {

};

startButton.addEventListener('click', startGame);