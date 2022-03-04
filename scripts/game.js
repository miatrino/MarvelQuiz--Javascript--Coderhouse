
const question = document.getElementById('question');
const choices =Array.from( document.getElementsByClassName('choice-text'));
const progressText=document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');

let currentQuestion={};
let acceptingAnswers= false;
let score = 0;
let questionCounter=0;
let availableQuestions=[];
let questions=[
    {
        question:"¿En qué año se estrenó la primera película de Iron Man, que lanzó el Marvel Cinematic Universe?",
        choice1: "2005",
        choice2: "2006",
        choice3: "2008",
        choice4: "2010",
        answer:  3
      },
      {
          question:"¿Cómo se llama el martillo de Thor?",
          choice1: "Vanir",
          choice2: "Mjolnir",
          choice3: "Aesir",
          choice4: "Jonathan",
        answer:  2
        },
        {
        question:"En The Incredible Hulk, ¿qué le dice Tony a Thaddeus Ross al final de la película?",
        choice1: "Que quiere estudiar a Hulk",
        choice2: "Que él sabe sobre SHIELD",
        choice3: "Que están formando un equipo",
        choice4: "Que Thaddeus le debe dinero",
        answer:  3
        },
        {
        question: "¿De qué está hecho el escudo del Capitán América?",
        choice1: "Adamantium",
        choice2: "Vibranio",
         choice3: "Prometeo",
        choice4: "Carbonadio",
        answer:  2
        },
        {
        question:" Los Flerkens son una raza de alienígenas extremadamente peligrososas ¿qué se parece a que animal?",
        choice1: "Gatos",
        choice2: "Patos",
        choice3: "Reptiles",
        choice4: "Mapaches",
        answer:  1
        },
        {
        question: "Antes de convertirse en Visión, ¿cómo se llama el mayordomo de inteligencia artificial de Iron Man?",
        choice1:"HOMERO",
        choice2:"JARVIS",
        choice3:"ALFRED",
        choice4:"MARVIN",
        answer:  2
        },
        {
        question:"¿Cuál es el verdadero nombre de la Pantera Negra?",
        choice1: "T'Challa",
         choice2: "M'Baku",
        choice3: "N'Jadaka",
        choice4: "N'Jobu",
        answer:  1
        },
        {
        question:"¿Cuál es la raza alienígena que Loki envía para invadir la Tierra en The Avengers?",
        choice1:"Chitauris",
        choice2:"Skrulls",
        choice3:"Krees",
      choice4:"Flerkens",
        answer: 1
        },
        {
        question:"¿Quién fue el último titular de la Gema del Espacio antes de que Thanos lo reclame para su Guantelete?",
        choice1: "Thor",
        choice2: "Loki",
        choice3: "El coleccionista",
        choice4: "Tony Stark",
        answer:  2
        },
        {
         question:"¿Qué nombre falso usa Natasha cuando conoce a Tony por primera vez?",
        choice1: "Natalie Rushman",
        choice2: "Natalia Romanoff",
        choice3: "Nicole Rohan",
         choice4: "Naya Rabe",
      answer:  1
        }
]
//CONSTANTS 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS=10;

starGame =()=>{
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
}

getNewQuestion = ()=>{
    if(availableQuestions.length===0||questionCounter>=MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore',score);
        //go to the End Page
        return window.location.assign('../pages/end.html');
    }

    questionCounter++;
    progressText.innerText = `Pregunta ${questionCounter}/${MAX_QUESTIONS}`;

    //Update the progress bar
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    const questionIndex= Math.floor(Math.random()*availableQuestions.length);
    currentQuestion= availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;

    choices.forEach(choice=>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice'+number];
    })

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers=true;
};
choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
       if(!acceptingAnswers) return;

       acceptingAnswers=false;
       const selectedChoice = e.target;
       const selectedAnswer = selectedChoice.dataset['number'];

       const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

       if(classToApply==='correct'){
            incrementScore(CORRECT_BONUS)
       }

       selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( ()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000)
       
    })
});
incrementScore = num =>{
    score+=num;
    scoreText.innerText = score
}
starGame();
