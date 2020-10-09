
// ------ Variable Declarations ------------

// ------------------------------
// build page backbone from blank
// ------------------------------


// grab the body
var bodyEl = document.body;


// ------------------------------------------
// make a header showing highscores and timer
// ------------------------------------------
var headerEl = document.createElement("header");
headerEl.setAttribute("style", "height: 60px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center");


//high scores div (to be modified on a click event)
var highscoreLinkEl = document.createElement("div");
highscoreLinkEl.textContent = "High Scores"


//display timer part
var timerEl = document.createElement("div");


// buld header
headerEl.appendChild(highscoreLinkEl)
headerEl.appendChild(timerEl);
bodyEl.appendChild(headerEl);


// --------------------------------------------
// Make the main part for start button and quiz
// --------------------------------------------

var mainEl = document.createElement("main");
mainEl.setAttribute("style", "text-align:center");

// make a start button
var startButtonEl = document.createElement("button");
startButtonEl.setAttribute("id", "startbutton");
startButtonEl.setAttribute("type", "button");
startButtonEl.textContent = "Start Timer"


//build main section
mainEl.appendChild(startButtonEl);
bodyEl.appendChild(mainEl);


// ------------------
// Array of questions
// ------------------
var qArray = [];

// Question object structure:
test = {q:"What is the meaning of life",
        p: [44, 43, 42, 41],
        a_index: 2};

test2 = {q:"What is Hoisting",
p: ["The feeling you get when code works","Affecting the order which code is interpreted"],
a_index: 1};

test3 = {q:"What is Bubbeling",
p: ["The feeling you get when code works","Affecting the order which events are handled", "Putting rounded corners on all borders"],
a_index: 1};


qArray[0] = test;
qArray[1] = test2;
qArray[3] = test3;
console.log(qArray);
    

// ------ END Variable Declarations ------------





// ------ Function Declarations ------------


// -----------------------
// Build dynamic elements
// -----------------------

var buildQuestionElement = function(qObj){
    // takes a question qObj and returns a DOM element
    var qEl = document.createElement("div");
    qEl.setAttribute("style", "display: flex; flex-direction: column; flex-wrap: wrap")
    qEl.setAttribute("id", "qContainer")
    // Heading with the question and append to qEl
    var qH2El = document.createElement("h2");
    qH2El.textContent = qObj.q;
    qEl.appendChild(qH2El);

    // create container with possible answers in buttons
    possibleAnswersEl = buildAnswerbuttons(qObj);
    qEl.appendChild(possibleAnswersEl);

    return qEl;
};


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

// -----------------------------
// Check answers and keep talley
// -----------------------------





var checkAnswerCorrect = function(qEl, answer){

   if(parseInt(qEl.a) === parseInt(answer)){
       return true;
   } else {
       return false;
   };
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

// main countdown loop 
var startClicked = function(){
   
    // hide the start button
    startButtonEl.hidden = true;

    
    var countdown = 5;

    // function running in timeInterval     
    var countdownFunc = function(){
        console.log(countdown);
        updateAtTimeCycle(countdown);
        countdown --;

        if(countdown <= 0){
            clearInterval(timer);
            updateAtTimeCycle("Time is up! 0");
            
            return;
        }



    }

    var timer = setInterval(countdownFunc,1000);    
    
    // test element build
    var qEll = buildQuestionElement(qArray[1]);
    mainEl.appendChild(qEll);
    


    // capture events
    //Event listener on question container, sending back the data-index from the button pressed  
    qEll.addEventListener("click", ansBtnClickHander);    
    
    // display score

};

// ------------------
// Callback funcitons
// ------------------
var ansBtnClickHander = function(event){
    var ansIdx = event.target.getAttribute("data-index");    
    if(ansIdx){
        
        
    }; 
};



// ------ END Function Declarations ------------



// ---------- main excecution ------------
startButtonEl.addEventListener("click", startClicked);

