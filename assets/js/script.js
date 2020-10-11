
// ------ Variable Declarations ------------



// ------------------
// Array of questions
// ------------------
var qArray = [];

// Question object structure:
test = {q:"What is the meaning of life?",
        p: [44, 43, 42, 41],
        a: 2};

test2 = {q:"What is Hoisting in programming?",
p: ["The elevated feeling you get when code works","Affecting the order which code is interpreted", "Picking variables out of deeply nested for loops"],
a: 1};

test3 = {q:"What is Bubbeling in Javascript?",
p: ["Affecting the order which events are handled","The feeling you get when code works", "Putting rounded corners on all borders"],
a: 0};

test4 = {q: "Where is the correct place to insert a JavaScript?",
p: ["The <head> section", "The <body> section", "The <footer> section"],
a: 1};

test5 = {q: "How many equal signs should go in equal to conditional if you also want oprand types to match?",
p: ["One", "Two", "Three", "Four"],
a: 2};

test6 = {q: "Inside which HTML element do we put the JavaScript?",
p: ["<scripting>", "<script>", "<js>", "<jacascript>"],
a: 1};

test7 = {q: "Which will not generate a window pop-up?",
p: ["window.alert", "window.confirm", "window.pop", "window.prompt"],
a: 2};

test8 = {q: "Which appproach will not get a value out of a function running in setInterval?",
p: ["Have the callback return a value", "Define the variable in a scope above "],
a: 1}


qArray[0] = test;
qArray[1] = test2;
qArray[2] = test3;
qArray[3] = test4;
qArray[4] = test5;    
qArray[5] = test6;
qArray[6] = test7; 




// Initialize page-global variables
var i_current = 0; // current iteration of questions start at 0
var score = 0; // score initilized to 0
var currentTime = 75; //seconds



// ------------------------------
// build page static DOM backbone from blank
// ------------------------------


// grab the body
var bodyEl = document.body;

// ------------------------------------------
// make a header showing highscores and timer
// ------------------------------------------
var headerEl = document.createElement("header");
headerEl.setAttribute("style", "height: 60px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; padding: 0 20px;font-size: 20px");


//high scores div (to be modified on a click event)
var highscoreLinkEl = document.createElement("div");
highscoreLinkEl.textContent = "High Scores - Click Here";
highscoreLinkEl.setAttribute("id", "highscoresBtn");

//display timer part
var timerEl = document.createElement("div");

// make a start button
var startButtonEl = document.createElement("button");
startButtonEl.setAttribute("id", "startbutton");
startButtonEl.setAttribute("type", "button");
startButtonEl.setAttribute("style", "width: 200px; height: 50px");
startButtonEl.textContent = "Start Timer"

// buld header
headerEl.appendChild(highscoreLinkEl);
headerEl.appendChild(startButtonEl);
headerEl.appendChild(timerEl);
bodyEl.appendChild(headerEl);


// --------------------------------------------
// Make the main part for start button and quiz
// --------------------------------------------
var mainEl = document.createElement("main");
//mainEl.setAttribute("style", "display: flex; flex-direction: column-reverse; align-items center");


//buid a containerdiv for questions 
var qContainerEl = document.createElement("div");
qContainerEl.setAttribute("id", "qContainer");
qContainerEl.setAttribute("style", "display: flex; flex-direction: column-reverse; align-items: center");


//build main section put it on the body
mainEl.appendChild(qContainerEl);
bodyEl.appendChild(mainEl);




// ------------------------------------------------
// Build functions to generate dynamic DOM elements
// ------------------------------------------------


var buildQuestionElement = function(qObj){
    // takes a question qObj and returns a DOM element
    var qEl = document.createElement("div");
    qEl.setAttribute("style", "display: flex; flex-direction: column; flex-wrap: wrap")
    
   
    // Heading with the question and append to qEl
    var qH2El = document.createElement("h2");
    qH2El.textContent = qObj.q;
    qEl.appendChild(qH2El);

    // create container with possible answers in buttons
    possibleAnswersEl = buildAnswerbuttons(qObj);
    qEl.appendChild(possibleAnswersEl);

    return qEl;
};

// Build a block of buttons with possible answers
var buildAnswerbuttons = function(qObj){
    // takes a question object and returns a div with buttons
    var ansBtnContainer = document.createElement("div");
    ansBtnContainer.setAttribute("style", "display: flex, flex-direction: column, flex-wrap: wrap")

    for(var i=0; i<qObj.p.length;i++){
        pButtonEl = document.createElement("div");
        pButtonEl.textContent = (i+1) + ". " + qObj.p[i];
        pButtonEl.setAttribute("data-index", i); //save the index in an attribute called "data-index"
        pButtonEl.setAttribute("class", "choiceBtn"); 
        pButtonEl.setAttribute("style", "height: 30px; width: auto; color: blue");
        
        //append button to container
        ansBtnContainer.appendChild(pButtonEl);
    } 
    return ansBtnContainer;
};

var putQuestionInDOM = function(qObj){
    qEll = buildQuestionElement(qObj);
    var id = "qElement" + i_current;
    
    qEll.setAttribute("id", id);
    qEll.setAttribute("style", "display: inline; width: 500px; padding: 20px; margin: 20px; border: 2px solid black" )
    // get the current qContainer and replace it with the new qEll
    qContainer = document.getElementById("qContainer"); 
    qContainer.appendChild(qEll); 
};


// Check answers and keep talley
var buildReponseEl = function(qEl, answer){
    // takes a question object and the user reponse, returns a dom element with a reponse 
    
    respEl = document.createElement("div");
    // convert to integers for check with if
    qEl.a = parseInt(qEl.a)
    answer = parseInt(answer)

    if(qEl.a === answer){
        right = "Correct ! No: " + (qEl.a+1) + " is the right answer";
        score += 100;
        

    } else {
        right = "Not Correct !" + " you answered " + (answer+1) + " The right answer is " + (qEl.a+1) + "15s subtracted";
        // subtract time 
        currentTime -= 15;       
    };

    // append answer to the question    
    respEl.textContent = "That is: " + right; 
    var id = "qElement" + i_current;
    document.getElementById(id).appendChild(respEl);
};

// -----------------------------------
// main quizzing when start is clicked
// ----------------------------------- 
var startClicked = function(){

    // reset
    i_current = 0; // current iteration of questions start at 0
    score = 0; // score initilized to 0
    currentTime = 75; //seconds

    document.getElementById("qContainer").innerHTML = ""
    // hide the start button
    startButtonEl.hidden = true;
    
    // start the timer
    var runningTime = 75; 
    timerFunc(timeElapsed); // see callbacks for timeElapsed

    //randomize qArray
    qArray.sort( () => .5 - Math.random() );

    // put the first question in
    putQuestionInDOM(qArray[0]);
};



// -------------------
// Timing 
// -------------------

// Things that need to be updated at each time cycle
var updateAtTimeCycle = function(timeval){
    timerEl.textContent = "Timer: " + timeval + "s";
    if(timeval <= 3){
        timerEl.setAttribute("style", "color: red")
    }
};


 // main timerfunction holding the set interval     
function timerFunc(tElapsedCallback){  
    // takes integer for countdown time ans a callback handling what happens when the time is elapsed
    
    // subtract 1 from countdown every 1s and excecute callBack when done
    var countdownInnerFunc = function(){
       
        updateAtTimeCycle(currentTime);
        currentTime --;
        
        if(currentTime <= 0){
            clearInterval(timer);
            updateAtTimeCycle("Time is up! 0"); 
            tElapsedCallback(); 
        };
    };
    var timer = setInterval(countdownInnerFunc,1000);    
}

// ------------------
// Callback funcitons
// ------------------

// When countdown has ended ...
function timeElapsed(){
    console.log("Time Elapsed");
    
    // show score
    var scoreEl = document.createElement("div");
    scoreEl.textContent = "Congrats you are Done, your score was: " + score;
    

    // clear the page and show scores
    document.getElementById("qContainer").innerHTML = ""
    document.getElementById("qContainer").appendChild(scoreEl);


    // get player name using a prompt and save it to loaca storage
    var playerName = window.prompt("Type a player name to save score");   
    
    // if user wants to put something in
    if(playerName){

        scoreObj = { 
            "name": playerName,
            "score": score
        };

        // get highscores from storage
        var storageArray = localStorage.getItem("scoreArray");
        if(storageArray != null){;
            storageArray = JSON.parse(storageArray)
            storageArray.push(scoreObj);
            localStorage.setItem("scoreArray",JSON.stringify(storageArray));
        } else {
            var storageArray = [];
            storageArray.push(scoreObj);
            localStorage.setItem("scoreArray",JSON.stringify(storageArray));
        };
    };
   
};

    
var ansBtnClickHandler = function(event){    
    // clicks on main bubbleing up and captured if data-index in attribute 

    var ansIdx = event.target.getAttribute("data-index");        
    if(ansIdx){
        
        // evaluate answer    
        buildReponseEl(qArray[i_current], ansIdx);

        // Pose next question
        if(i_current < qArray.length-1 ) {
            i_current++
            console.log(i_current);
            putQuestionInDOM(qArray[i_current]);
           
        } else {
            alert("No more questions");
            currentTime = 1;
        }   
    };    
};

var highScoresClicked = function(){
    // get highscores from storage


    // clear qContainer
    // Build a highscore element
    
    var highScoreEl = document.createElement("div");
    var highScoreElH2 = document.createElement("h2");
    highScoreElH2.textContent = "High scores: ";
    highScoreEl.appendChild(highScoreElH2);

    var clearHighscoresBtn = document.createElement("button");
    clearHighscoresBtn.textContent = "Clear Highscores?";

    var storageArray = localStorage.getItem("scoreArray");
    if(storageArray != null){;
        
        var oListEl = document.createElement("ol");
        
        // parse and sort the highscore array
        storageArray = JSON.parse(storageArray)
        storageArray = storageArray.sort((a,b)=>(a.score > b.score)?-1:1);

        for(highScore of storageArray){
            var listEl = document.createElement("li");
            listEl.textContent = "Name: " + highScore.name + " Score: " + highScore.score
            oListEl.appendChild(listEl);                 
        }; 
        highScoreEl.appendChild(oListEl);
        
    } else {
        var scoresParagraph = document.createElement("div");
        scoresParagraph.textContent = "nothing stored yet";
        highScoreEl.appendChild(scoresParagraph);
        clearHighscoresBtn.hidden = true;
    };

   
    
    
    clearHighscoresBtn.addEventListener("click",clearHighscoresHandler);
       
    // clear the page and show scores
    document.getElementById("qContainer").innerHTML = "";
    document.getElementById("qContainer").appendChild(clearHighscoresBtn);
    document.getElementById("qContainer").appendChild(highScoreEl);
    

};

var clearHighscoresHandler = function(){
    localStorage.removeItem("scoreArray");
    highScoresClicked();
}


// ------ event listeners ------------
   
// listen for clicks on the main element
mainEl.addEventListener("click", ansBtnClickHandler); 

// buttons
startButtonEl.addEventListener("click", startClicked);
highscoreLinkEl.addEventListener("click", highScoresClicked);



