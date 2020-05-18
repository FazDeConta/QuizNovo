
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

/* Local JSON file : questions.json */
let questions = [

    {
        "question" : "Qual é a data correta de incoming date nesse cenário ?",
        "choice1" : "Data de aprovação na SEFAZ",
        "choice2" : "Data do primeiro e-mail do fornecedor para o funcional do Datacap",
        "choice3" : "Primeira data de baixo para cima na aba History",
        "choice4" : "Data do carimbo da fatura",
        "answer" : 3
    },
    {
        "question" : "Qual é a data correta de incoming date nesse cenário ?",
        "choice1" : "Data de aprovação na SEFAZ",
        "choice2" : "Data do primeiro e-mail do fornecedor para o funcional do Datacap",
        "choice3" : "Primeira data de baixo para cima na aba History",
        "choice4" : "Data de emissão da fatura",
        "answer" : 2
    },
    {
        "question" : "Qual é a data correta de incoming date nesse cenário ? ",
        "choice1" : "Data de aprovação na SEFAZ",
        "choice2" : "Data do primeiro e-mail do fornecedor para o funcional do Datacap",
        "choice3" : "Primeira data de baixo para cima na aba History",
        "choice4" : "Data de emissão da fatura",
        "answer" : 3
    },
    {
        "question" : "Qual é a data correta de incoming date nesse cenário ?",
        "choice1" : "Data de aprovação na SEFAZ",
        "choice2" : "Data do primeiro e-mail do fornecedor para o funcional do Datacap",
        "choice3" : "Primeira data de baixo para cima na aba History",
        "choice4" : "Data do carimbo da fatura",
        "answer" : 1
    },
    {
        "question" : "Qual é a data correta de incoming date nesse cenário ?",
        "choice1" : "Data de aprovação na SEFAZ",
        "choice2" : "Data do primeiro e-mail do fornecedor para o funcional do Datacap",
        "choice3" : "Primeira data de baixo para cima na aba History",
        "choice4" : "Data de emissão da fatura",
        "answer" : 1
    },
    {
        "question" : "Qual data que devemos considerar como incoming date quando o Scan location informar CRID / IMBR / IMCN / IMDA / IMHK / IMIN / IMSP /RIAR / RICO / RITW e o Channel informar OCR_ML ?",
        "choice1" : "Data do carimbo e caso não houver, utilizar a data da emissão da fatura",
        "choice2" : "Data da emissão da fatura",
        "choice3" : "Data do primeiro e-mail do fornecedor para o funcional do Datacap",
        "choice4" : "Primeira data de baixo para cima na aba History",
        "answer" : 1
    },
    {
        "question" : "O que devemos fazer quando tiver somente o histórico do e-mail do Datacap dentro do arquivo EML ?",
        "choice1" : "Entrar em contato com o time de Datacap para solicitar o histórico",
        "choice2" : "Utilizar a data de emissão da fatura como incoming date",
        "choice3" : "Utilizar a data do e-mail do Datacap como incoming date",
        "choice4" : "Primeira data de baixo para cima na aba History",
        "answer" : 2
    },
    {
        "question" : "Qual data que devemos considerar como incoming date quando se trata de uma DP de ajuste de contabilização ?",
        "choice1" : "Data de emissão da fatura",
        "choice2" : "Primeira data de baixo para cima na aba History",
        "choice3" : "Data do primeiro e-mail do fornecedor para o funcional do Datacap",
        "choice4" : "O incoming date da DP da contabilização original ",
        "answer" : 4
    },
    {
        "question" : "Qual a ordem correta que devemos considerar como incoming date quando o channel for OAWD ?",
        "choice1" : "Data do carimbo e se não houver, a data do arquivo EML e se não houver, data da emissão da fatura",
        "choice2" : "Data do arquivo EML e se não houver, a primeira data de baixo para cima na aba History",
        "choice3" : "Data do arquivo EML e se não houver, data do carimbo e se não houver, a data de emissão da fatura",
        "choice4" : "Data do arquivo EML e se não houver, a data de emissão da fatura",
        "answer" : 3
    },
    {
        "question" : "Se a data de recebimento (Invoice Receipt Date) for anterior à data da emissão da fatura (Invoice date), devemos utilizar a data da fatura como incoming date. Essa afirmação é: ",
        "choice1" : "Falso",
        "choice2" : "Verdadeiro",
        "answer" : 2
    },
    {
        "question" : "Qual data que devemos considerar como incoming date quando se trata de uma Legal invoice ?",
        "choice1" : "Data de emissão da fatura",
        "choice2" : "A primeira data de baixo para cima na aba History",
        "choice3" : "Data do primeiro e-mail do fornecedor para o funcional do Datacap",
        "choice4" : "Data informada no campo Received Date do arquivo excel dentro do EML",
        "answer" : 4
    },
    {
        "question" : "Qual é a data correta de incoming date nesse cenário ?",
        "choice1" : "Data de aprovação na SEFAZ",
        "choice2" : "Data do primeiro e-mail do fornecedor para o funcional do Datacap",
        "choice3" : "Primeira data de baixo para cima na aba History",
        "choice4" : "Data de emissão da fatura",
        "answer" : 3
    }
];
/* Local TRIVIA : url
fetch(
        "questions.json"
    ) 
    .then(res => {
        return res.json();
    })
    .then(loadedQuestions => {   
        console.log(loadedQuestions); 
        questions = loadedQuestions;
            const formattedQuestion = {
                question: loadedQuestion.question
            };

            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            answerChoices.splice(
                formattedQuestion.answer - 1, 
                0,
                loadedQuestion.correct_answer
            );

            answerChoices.forEach((choice, index) => {
                formattedQuestion["choice" + (index + 1)] = choice;
            })

            return formattedQuestion;
        });


    })
    .catch(err => { 
        console.error(err);
    });

/* constants */
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 12;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        /*go to the end page*/
        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;

};

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if(!acceptingAnswers) return ;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectAnswer = selectedChoice.dataset["number"];

        const classToApply = selectAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        
        if(classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerHTML = score;
};
startGame();