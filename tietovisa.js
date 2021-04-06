var questionNum = 0     //Tracking the state of the quiz
var questions = ["Mikä paikka on kyseessä?", "Mistä näistä paikoista voit löytää tietoa julkisesta liikenteestä?"]
var correctAns = [1,3]      //Id of correct answer (1-4)
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
    resetGame();
    startGame();
}

function resetGame()
{
    questionNum = 0;
    answerInput = 0;
    imageSrc = "";
    curScore = 0;
    updateQuestion(questions[questionNum])
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
        maxScore.innerHTML = correctAns.length;
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

function updateQuestion(text)
{
    if(gameOn)
    {
        document.getElementById("quiz-question").innerHTML = text;
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
}

async function freezeState(ms)
{
    quizOptions = document.getElementsByClassName("answer-box");
    for(let i = 0; i < quizOptions.length; i++)
    {
        quizOptions[i].onclick = function() {console.log("Tried to click")}
    }
    await sleep(ms);
    for(let i = 1; i <= quizOptions.length; i++)
    {
        quizOptions[i-1].onclick = function() {answer(event, i)};
    }
}

async function answer(event, id)
{
    resetAnswers();
    //Find answer boxes
    quizOptions = document.getElementsByClassName("answer-box");
    //If answer was correct, display it as green and others as red 
    if(id == correctAns[questionNum])
    {
        for(let i = 0; i < quizOptions.length; i++)
        {
            quizOptions[i].className += " wrongAns"
        }
        ans = document.getElementById(id)
        ans.className = "answer-box";
        ans.className += " correctAns";
        
        updateQuestion("Aivan oikein!");
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
        rightAns = document.getElementById(correctAns[questionNum]);
        rightAns.className = "answer-box";
        rightAns.className += " expectedAns";

        updateQuestion("Nyt meni väärin!");
    }
    //Lock the buttons

    await freezeState(2000);
    nextQuestion();
}