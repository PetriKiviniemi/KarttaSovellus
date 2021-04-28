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
                saavut aulaan, josta löytyy mm. OYY:n toimisto, ruokaloita sekä Telluksen rentoutumis- ja keskittymisalueet.`,
                "./assets/template.jpg");
    addQuestion("Mistä yliopiston läheisyydessä olevasta paikasta voit löytää tropiikin tai saharan ilmaston jokaisena vuodenaikana?", 
                ["Kasvitieteellinen puutarha", "Ravintola Caio", "Tellus", "Toppilan saunamaailma"],
                1,
                `Oikea vastaus: Kasvitieteellinen puutarha`,
                "./assets/template.jpg",
                "./assets/kasviMark.png");
    addQuestion("Mihin kannattaa opiskelijan suunnata ensimmäisenä kun kohtaa seuraavia oireita: kaljahampaan kolotus, tanssijalan vipatus, tapahtuma-himo?", 
                ["Linnanmaan liikuntahalli", "Ravintola Caio", "Tokmanni", "Tellus"],
                2,
                `Oikea vastaus: Ravintola Caio`,
                null);
    addQuestion("Mikä saari on vastikään päivityksen saanut ulkoilukohde sekä kuuluisa kesän festivaaleistaan?", 
                ["Kuusisaari", "Lammassaari", "Turkansaari", "Linnansaari"],
                1,
                `Oikea vastaus: Kuusisaari`,
                null);
    addQuestion("Tämän herkun ohi on helppo sujahtaa huomaamatta pyöräbaanaa pitkin, mutta pysähtyessäsi voit löytää historiallisen kahvila-kirjakaupan tai vesipuiston.", 
                ["Ainolanpuisto", "Kiikeli", "Mannerheiminpuisto", "Linnansaari"],
                4,
                `Oikea vastaus: Linnansaari`,
                null);
    addQuestion("Ouluun liittyvät kysymykset odottavat kysyjäänsä virka-aikoina tässä paikassa.", 
                ["Kauppahalli", "Tuiran uimaranta", "Ravintola Kaarlenhovi", "Oulu10"],
                4,
                `Oikea vastaus: Oulu10`,
                null);
    addQuestion("Kuka on kuvassa oleva henkilö, jonka elämäntyö perustuu Oulun Kauppatorin vartiointiin?", 
                ["Torivahtimestari", "Torisairaanhoitaja", "Toripolliisi", "Torikauppias"],
                3,
                `Oikea vastaus: Torikauppias`,
                null);
    addQuestion("Mikä seuraavista on Oulun keskustan suurin ja kattavin, vuodenajasta riippumatta kaunis ulkoilu- ja ajanviettopaikka?", 
                ["Ainolanpuisto", "Peppers", "Valkea", "Kiikeli"],
                1,
                `Oikea vastaus: Ainolanpuisto`,
                null);
    addQuestion("Jokirannan paras pulahdus, oli sitten helle tai pakkanen, löytyy täältä.", 
                ["Torinranta", "Linnansaari ", "Pikisaari", "Tuiran uimaranta"],
                4,
                `Oikea vastaus: Tuiran uimaranta`,
                null);
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
        document.getElementById("quiz-image").src = questionObj.img;
        quizOptions = document.getElementsByClassName("answer-box");
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
    quizOptions = document.getElementsByClassName("answer-box");
    for(let i = 1; i <= quizOptions.length; i++)
    {
        quizOptions[i-1].onclick = function() {answer(event, i)};
    }
}

function answer(event, id)
{
    resetAnswers();
    //Update the image to show the location
    document.getElementById("quiz-image").src = questions[questionNum].imgAfter;

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
function addQuestion(question, answers, cAns, ansDesc, locImg, imageAfter)
{
   var tmp = {
       questionDesc: question,
       questionAnswers: answers,
       correctAns: cAns,
       answerDesc: ansDesc,
       img: locImg,
       imgAfter: imageAfter,
   };
   questions.push(tmp);
}