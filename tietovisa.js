var questionNum = 0     //Tracking the state of the quiz
var questions = []
var correctAns = 0      //Id of correct answer (1-4)
var answerInput = 0     //User input for answer (1-4)
var imageSrc = "";      //Source for the quiz image
var curScore = 0;
var gameOn = true;      //boolean for game/menu state

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function init()
{
    console.log("Starting tietovisa");
    addQuestion("Lämmittelykysymys: Mikä yliopiston Linnanmaan kampuksella sijaitseva sisäänkäynti on kyseessä?", 
                ["G-ovi", "F-ovi", "2T-ovi", "J-ovi"],
                2,
                `2T -ovi on yliopiston pääsisäänkäynti. Edustalla on kattavasti pyöräparkkeja, 
                parkkipaikka autoille sekä bussipysäkit. Kun kävelet ovesta sisään ja jatkat matkaasi suoraan, 
                saavut aulaan, josta löytyy mm. OYY:n toimisto, ruokaloita sekä Telluksen rentoutumis- ja keskittymisalueet.`);
    addQuestion("Toinen kysymys", 
                ["a", "b", "c", "d"],
                3,
                `c oli oikea vastaus.`);
    console.log(correctAns)
    resetGame();
    startGame();
}

function resetGame()
{
    questionNum = 0;
    answerInput = 0;
    imageSrc = "";
    curScore = 0;
    document.getElementById("next-btn").style.display = 'none';
    updateQuestion(questions[0])
    resetAnswers();
}

function resetAnswers()
{
    quizOptions = document.getElementsByClassName("answer-box");
    for(var i = 0; i < quizOptions.length; i++)
    {
        quizOptions[i].className = "answer-box";
    }
}

function startGame()
{
    gameOn = true;
    playState();
    resetGame();
    hideMenu();
    displayGame();
}

function displayGame()
{
    if(gameOn)
    {
        quiz = document.getElementById("quiz");
        quiz.style.display = 'flex';
    }
}

function displayMenu()
{
    if(!gameOn)
    {
        menu = document.getElementById("play-menu");
        userScore = document.getElementById("curScore");
        maxScore = document.getElementById("maxScore");
        
        menu.style.display = 'flex';
        userScore.innerHTML = curScore;
        maxScore.innerHTML = questions.length;
    }
}

function hideMenu()
{
    menu = document.getElementById("play-menu");
    menu.style.display = 'none';
}

function hideGame()
{
    quiz = document.getElementById("quiz");
    quiz.style.display = 'none';
}

function gameOver()
{
    gameOn = false;
    hideGame();
    displayMenu();
}

function updateQuestion(questionObj)
{
    if(gameOn)
    {
        document.getElementById("quiz-question").innerHTML = questionObj.questionDesc;
        quizOptions = document.getElementsByClassName("answer-box");
        console.log("hello")
        //Update quiz answers
        for(let i = 0; i < quizOptions.length; i++)
        {
            quizOptions[i].innerHTML = questionObj.questionAnswers[i];
        }
        correctAns = questionObj.correctAns;
    }
}

function nextQuestion()
{
    console.log("Next question")
    questionNum += 1;
    resetAnswers();
    if(questionNum > questions.length-1)
    {
        //Game over
        gameOver();
        return;
    }
    updateQuestion(questions[questionNum])
    document.getElementById("next-btn").style.display = 'none';
    playState()
}

//Not needed anymore
function freezeState(ms)
{
    quizOptions = document.getElementsByClassName("answer-box");
    for(let i = 0; i < quizOptions.length; i++)
    {
        quizOptions[i].onclick = function() {console.log("Tried to click")}
    }

}

function playState()
{
    for(let i = 1; i <= quizOptions.length; i++)
    {
        quizOptions[i-1].onclick = function() {answer(event, i)};
    }
}

function answer(event, id)
{
    resetAnswers();
    //Find answer boxes
    quizOptions = document.getElementsByClassName("answer-box");
    //If answer was correct, display it as green and others as red 
    if(id == correctAns)
    {
        for(let i = 0; i < quizOptions.length; i++)
        {
            quizOptions[i].className += " wrongAns"
        }
        ans = document.getElementById(id)
        ans.className = "answer-box";
        ans.className += " correctAns";
        
        document.getElementById("quiz-question").innerHTML = "Aivan oikein! " + questions[questionNum].answerDesc;
        curScore += 1;
    }
    //Otherwise display blinking animation for the correct answer, and turn others red
    else
    {
        for(let i = 0; i < quizOptions.length; i++)
        {
            quizOptions[i].className += " wrongAns"
        }
        ans = document.getElementById(id);
        ans.className = "answer-box";
        ans.className += " selWrongAns";
        rightAns = document.getElementById(correctAns);
        rightAns.className = "answer-box";
        rightAns.className += " expectedAns";

        document.getElementById("quiz-question").innerHTML = "Nyt meni väärin! " + questions[questionNum].answerDesc;
    }
    //Show next btn
    document.getElementById("next-btn").style.display = 'block';
    freezeState();
}

//question = string
//answers = array of strings
function addQuestion(question, answers, cAns, ansDesc)
{
   var tmp = {
       questionDesc: question,
       questionAnswers: answers,
       correctAns: cAns,
       answerDesc: ansDesc,
   };
   questions.push(tmp);
}