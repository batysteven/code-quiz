const startButton = document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
var timeLeft = 60;
var timer;

function checkTime() {
    document.getElementById('quiz-time-left').innerHTML = timeLeft;
     if (timeLeft <= 0) {
         endGame();
     } else {
         timeLeft--;
        timer = setTimeout(checkTime, 1000);
     }
};
timer = setTimeout(checkTime, 1000);

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
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (answeredQuestionIndex === randomQuestions.length - 1) {
        endGame();
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct){
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
    var endQuiz = document.createElement('div');
    endQuiz.textContent = "Your Quiz is now completed!";
    document.getElementById('endQuiz').innerText = endQuiz.textContent;
    endQuiz;
    clearInterval(timer);
};

    
startButton.addEventListener('click', startGame);