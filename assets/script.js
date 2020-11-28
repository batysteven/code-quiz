const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
var timeLeft = 60;
var timer;
var points = 0;

//Timer starting from 60 seconds counting down for quiz
function checkTime() {
    document.getElementById('quiz-time-left').innerHTML = timeLeft;
     if (timeLeft <= 0) {
         endGame();
     } else {
         timeLeft--;
        timer = setTimeout(checkTime, 1000);
     }
};

//question and answers array
let randomQuestions, answeredQuestionIndex;
const questions = [
    {
        question: 'This is a question a',
        answers: [
            { text: 'not answer', wrong: false},
            { text: 'is answer', correct: true},
            { text: 'not answer', wrong: false},
            { text: 'not answer', wrong: false} 
        ]
    },
    {
        question: 'This is a question b',
        answers: [
            { text: 'is answer', correct: true},
            { text: 'not answer', wrong: false},
            { text: 'not answer', wrong: false},
            { text: 'not answer', wrong: false} 
        ]
    },
    {
        question: 'This is a question c',
        answers: [
            { text: 'not answer', wrong: false},
            { text: 'not answer', wrong: false},
            { text: 'not answer', wrong: false},
            { text: 'is answer', correct: true},
        ]
    },
    {
        question: 'This is a question d',
        answers: [
            { text: 'not answer', wrong: false},
            { text: 'not answer', wrong: false},
            { text: 'is answer', correct: true},
            { text: 'not answer', wrong: false} 
        ]
    },
    {
        question: 'This is a question e',
        answers: [
            { text: 'is answer', correct: true},
            { text: 'not answer', wrong: false},
            { text: 'not answer', wrong: false},
            { text: 'not answer', wrong: false} 
        ]
    }
];

function startGame() {
    //start timer for quiz
    timer = setTimeout(checkTime, 1000);
    startButton.classList.add('hide');
    randomQuestions = questions.sort(() => Math.random() - .5);
    answeredQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
};

function setNextQuestion() {
    resetState();
    showQuestion(randomQuestions[answeredQuestionIndex]);
};

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    })
};

function resetState() {
    while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
};

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    //changes background color if correct or wrong
    setStatusClass(document.body, correct);
    //track points when correct add 10
    if (correct) {
        points = points + 10;
        document.getElementById('points').innerHTML = points;
    }    
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (answeredQuestionIndex === randomQuestions.length - 1) {
        endGame();
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
};

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');

};

answerButtonsElement.addEventListener('click', () => {
    answeredQuestionIndex++
    setNextQuestion();
});

function endGame() {
    clearStatusClass(document.body);
    var endQuizText = document.querySelector("#endQuiz");
    endQuizText.className = "grid-container";
    endQuizText.textContent = "Your Quiz is now completed!";
    document.getElementById('endQuiz').innerText = endQuizText.textContent;
    var score = points + (60 - timer);
    showScore = document.createElement('div');
    showScore.className = "grid-item";
    showScore.textContent = "Your quiz score is " + score;
    endQuizText.appendChild(showScore);
    clearInterval(timer);
    
};

//start quiz on click start button
startButton.addEventListener('click', startGame);