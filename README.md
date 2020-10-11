# code-quiz
A quiz showing quiestions about Javascript to the user.
* Quis is timed, countdown starts at 75s
* Wrong answers causes 15s to be subtracted from the timer
* Correct anwers are rewardedwith 100pts
* User can save resutls in browser
* Questions are posed until the time is up or all questions answered


## Features:
* The order of Quesions is randomized 
* HighScores are sorted based on score
* Answers are to previous questions are shown with a comment below

##  You can find it here:
[https://kjwesthoff.github.io/code-quiz/](https://kjwesthoff.github.io/code-quiz/)

# Technical Notes: 
Since the topic for this module was DOM manipulation, i decided to build the whole page in JavaScript (see the minimal HTML page below). I have tried to comment the code and organize it so it is readable. I have not emphesized the estethics of the page, so please beat with the somewhat dull looking page..

```
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Code Quiz</title>
</head>
<body>
    <script src="./assets/js/script.js"></script>
</body>
</html>
</dl>
```