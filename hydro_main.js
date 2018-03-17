const defaultAvatarImage = "images/DefaultUser.png";
const r = "Correct! Good Job!";
const w = "Not Quite! Better Luck Next Time!";
const startQuizTitle = "HYDRONATION";
const endQuizTitle = "Congratulations!";
const avatarTitle = "Choose Your Avatar";
const openingPageReport = "Learn about water footprints and water usage with Hydronation";
const summaryPageTitle = "HYDRONATION";
const startQuizInstructions = "This game will take you through a normal day. As your day progresses you will answer questions about your water consumption.";

var currentQuestion = 0;
var currentScore = 0;
var onAppLoad = true;

var correctSound;
var wrongSound;
var applauseSound;
var cheerSound;

// Global Variables for Form Record
var newGeneratedID;


//document.getElementById("Header").style.visibility = "hidden"
var avatarSelected = 0;
var avatarOptions = [
  // Avatar 0
  {name: "panda", url: "images/Panda.png"},

  // Avatar 1
  {name: "unicorn", url: "images/Unicorn.png"},

  // Avatar 2
  {name: "elephant", url: "images/Elephant.png"},

  // Avatar 3
  {name: "lion", url: "images/Lion.png"},

  // Avatar 4
  {name: "monkey", url: "images/Monkey.png"},

  // Avatar 5
  {name: "penguin", url: "images/Penguin.png"},

  // Avatar 6
  {name: "cat", url: "images/Cat.png"},

  // Avatar 7
  {name: "seal", url: "images/Seal.png"},

  // Avatar 8
  {name: "giraffe", url: "images/Giraffe.png"}

];


// Called at game start...
function openingPage() {
  document.body.style.backgroundImage = "none";
  document.getElementById("Report").style.display = "none";
  document.getElementById("actionButton").style.display = "none";
  document.getElementById("QuestionList").style.display = "none";
  document.getElementById("AvatarOptions").style.display = "none";
  document.getElementById("thumbsUp").style.display = "none";
  document.getElementById("thumbsDown").style.display = "none";
  document.getElementById("recordSection").style.display = "none";

  //Opening page
  document.getElementById("AvatarImage").src = defaultAvatarImage;

  document.getElementById("TitleText").style.display = "none";

  document.getElementById("logo").style.display = "block";

  document.getElementById("actionButton").style.display = "block";
  document.getElementById("actionButton").style.visibility = "hidden";
  document.getElementById("actionButton").innerHTML = "Get Started!";
  document.getElementById("actionButton").style.visibility = "visible";

  document.getElementById("Report").style.display = "block";
  document.getElementById("ReportText").innerHTML = openingPageReport;
  document.getElementById("Report").style.visibility = "visible";

  document.getElementById("Score").innerHTML = "Score:  0";

  document.getElementById("actionButton").onclick = avatarPage;
  document.getElementById("HomeButton").onclick = openingPage;

  currentQuestion = 0;
  currentScore = 0;

  // Stuff that need to be initialized when page/app is started
  if (onAppLoad == true) {

    initializeSound();
    initializeForm();

    onAppLoad = false;
  }

  // Stop all sounds to get ready to play again.
  correctSound.stop();
  wrongSound.stop();
  applauseSound.stop();
  cheerSound.stop();

}

function avatarPage() {
  document.getElementById("logo").style.display = "none";
  document.getElementById("TitleText").style.display = "block";
  document.getElementById("actionButton").style.display = "block";
  document.getElementById("actionButton").style.visibility = "hidden";
  document.getElementById("actionButton").innerHTML = "Next";
  //document.getElementById("actionButton").style.visibility = "visible";

  document.getElementById("Report").style.display = "none";
  document.getElementById("TitleText").style.display = "none";
  document.getElementById("TitleText").innerHTML = avatarTitle;
  document.getElementById("TitleText").style.display = "block";

  document.getElementById("AvatarOptions").style.display = "block";
  document.getElementById("AvatarOptions").style.visibiliy = "hide";

  for (i = 0; i <= avatarOptions.length; i++) {
    document.getElementById(avatarOptions[i].name).src = avatarOptions[i].url;
    document.getElementById(avatarOptions[i].name).onclick = setAvatar;
  }

  document.getElementById("AvatarOptions").style.visibiliy = "visible";
}

function setAvatar() {
  //console.log(this.id);
  for (i = 0; i <= avatarOptions.length; i++) {
    if (avatarOptions[i].name == this.id) {
      avatarSelected = i;
      break;
    }
  }
  document.getElementById("AvatarImage").src = avatarOptions[i].url;
  document.getElementById("AvatarOptions").style.display = "none";
  startQuestion();
}

function startQuestion() {
  //Page before Questions

  var actButton = document.getElementById("actionButton");

  actButton.style.display = "block";
  actButton.style.visibility = "visible";

  document.getElementById("TitleText").style.visibility = "hidden";

  //console.log(currentQuestion);
  document.getElementById("QuestionList").style.visibility = "hidden";

  document.getElementById("TitleText").innerHTML = startQuizTitle;
  document.getElementById("TitleText").style.visibility = "visible";

  //console.log(startQuizInstructions);
  document.getElementById("ReportText").innerHTML = startQuizInstructions;
  document.getElementById("Report").style.display = "block";
  document.getElementById("TitleText").style.visibility = "visible";

  actButton.innerHTML = "GO!";
  actButton.style.display = "block";
  actButton.onclick = nextQuestion;
}

function nextQuestion() {
  //document.getElementById("Header").style.visibility = "hidden";

  var actButton = document.getElementById("actionButton");
  if (currentQuestion == questionsArray.length) {
    endQuestion();
  } else {
    document.getElementById("Report").style.visibility = "hidden";
    document.getElementById("Report").style.display = "none";
    document.getElementById("thumbsDown").style.display = "none";
    document.getElementById("thumbsUp").style.display = "none";
    actButton.style.display = "none";
    questionLoad();
  }

  document.getElementById("TitleText").style.visibility = "visible";
}

function endQuestion() {

  cheerSound.play();

  // document.body.style.backgroundImage = "url('images/confetti2.gif')";
  document.getElementById("thumbsUp").style.display = "none";
  document.getElementById("thumbsDown").style.display = "none";

  document.getElementById("TitleText").innerHTML = endQuizTitle;
  document.getElementById("TitleText").style.visibility = "visible";
  document.getElementById("TitleText").style.display = "block";

  document.getElementById("ReportText").innerHTML =
    "You finished with... <br>" + currentScore + " points!";

  // Show Record Form Section
  document.getElementById("recordSection").style.display = "block";

  document.getElementById("actionButton").innerHTML = "No Thanks";
  document.getElementById("actionButton").onclick = summary;

  // Button Callback for Submitting Record Form Data
  document.getElementById("submitButton").onclick = submitFormData;
  var team = document.getElementById('TeamNameInput');
  team.value = avatarOptions[avatarSelected].name;
}


function summary() {

  document.getElementById("recordSection").style.display = "none";

  document.getElementById("TitleText").innerHTML = summaryPageTitle;

  document.getElementById("ReportText").innerHTML = "Thanks For Playing!";

  document.getElementById("actionButton").innerHTML = "Play Again";

  document.getElementById("actionButton").onclick = openingPage;

  currentQuestion = 0;
}

function questionLoad() {

  document.getElementById("Score").innerHTML = "Score:  " + currentScore;

  document.getElementById("TitleText").style.display = "block";
  document.getElementById("TitleText").innerHTML =
    questionsArray[currentQuestion].question;

  var button1 = document.getElementById("Button1");
  var button2 = document.getElementById("Button2");
  var button3 = document.getElementById("Button3");
  var currentQuestionEntry = questionsArray[currentQuestion];

  button1.innerHTML = currentQuestionEntry.answers[0].answerValue;
  button2.innerHTML = currentQuestionEntry.answers[1].answerValue;
  button3.innerHTML = currentQuestionEntry.answers[2].answerValue;

  //console.log("showing questions...");
  document.getElementById("QuestionList").style.display = "block";
  document.getElementById("QuestionList").style.visibility = "visible";

  if (currentQuestionEntry.answers[0].isCorrect) {
    button1.onclick = submitCorrectAnswer;
  } else {
    button1.onclick = submitIncorrectAnswer;
  }
  if (currentQuestionEntry.answers[1].isCorrect) {
    button2.onclick = submitCorrectAnswer;
  } else {
    button2.onclick = submitIncorrectAnswer;
  }
  if (currentQuestionEntry.answers[2].isCorrect) {
    button3.onclick = submitCorrectAnswer;
  } else {
    button3.onclick = submitIncorrectAnswer;
  }
}

function submitCorrectAnswer() {
  //console.log("Got to submitCorrectAnswer with currentQuestion now set to " + currentQuestion);

  // Play correct sounds
  if ((currentQuestion+1) == questionsArray.length) {
    currentScore += 100;
    applauseSound.play();
  } else {
    correctSound.play();
  }

  nextQuestion();
  var currentQuestionEntry = questionsArray[currentQuestion];

  currentScore += 100;

  document.getElementById("Score").innerHTML = "Score: " + currentScore;

  document.getElementById("QuestionList").style.display = "none";
  document.getElementById("TitleText").style.display = "none";
  document.getElementById("thumbsUp").style.display = "block";
  document.getElementById("ReportText").innerHTML = currentQuestionEntry.incorrectAnswerExplanation;
  document.getElementById("Report").style.display = "block";
  document.getElementById("Report").style.visibility = "visible";
  document.getElementById("actionButton").innerHTML = "Next";
  document.getElementById("actionButton").style.display = "block";

  currentQuestion++;
}

function submitIncorrectAnswer() {
  //console.log("Got to submitIncorrectAnswer with currentQuestion now set to " + currentQuestion);

  var currentQuestionEntry = questionsArray[currentQuestion];

  // Play WaterFootPrintPieChartImage sounds
  wrongSound.play();

  nextQuestion();
  document.getElementById("QuestionList").style.display = "none";
  document.getElementById("TitleText").style.display = "none";
  document.getElementById("thumbsDown").style.display = "block";
  document.getElementById("ReportText").innerHTML = currentQuestionEntry.incorrectAnswerExplanation;
  document.getElementById("Report").style.display = "block";
  document.getElementById("Report").style.visibility = "visible";
  document.getElementById("actionButton").innerHTML = "Next";
  document.getElementById("actionButton").style.display = "block";

  currentQuestion++;
}

//
// SOUND STUFF
//
function initializeSound() {
  correctSound = new sound("sounds/correct.mp3");
  wrongSound = new sound("sounds/wrong.mp3");
  applauseSound = new sound("sounds/applause.mp3");
  cheerSound = new sound("sounds/cheer.mp3");
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
      this.sound.play();
  }
  this.stop = function(){
      this.sound.pause();
  }
}

//
// Reocord Form Submit Code
//
function initializeForm() {

  // Add score and ID elements to recordForm
  var form = document.getElementById("recordForm");
	var scoreInput = document.createElement('input');
	scoreInput.type = 'hidden';
	scoreInput.name = 'score';
	scoreInput.value = 0;
	form.appendChild(scoreInput);

	var generatedIDInput = document.createElement('input');
	generatedIDInput.type = 'hidden';
	generatedIDInput.name = 'generatedID';
	generatedIDInput.value = "";
	form.appendChild(generatedIDInput);

  // See if device has cookie, otherwise generate one/
  document.cookie = "test=testcookie";
  var lookupGeneratedID = getCookie("generatedID");
  newGeneratedID = lookupGeneratedID;
  if (lookupGeneratedID === "") {
    newGeneratedID = Math.floor((Math.random() * 10000000));
    document.cookie =	"generatedID=" + newGeneratedID;
  }

  clearFormInputs();
}

function clearFormInputs() {
  /* old code - there are other input types in the html
	var inputs = document.getElementsByTagName("input");
	for (i=0; i < inputs.length; i++) {
		inputs[i].value ="";
	}
  */
  document.getElementById("NameInput").value ="";
  document.getElementById("TeamNameInput").value ="";
  document.getElementById("FeedbackInput").value ="";
  document.getElementById("recordForm").elements["score"].value = 0;
  document.getElementById("recordForm").elements["generatedID"].value = "";

  console.log()
}

function submitFormData() {
	var form = document.getElementById("recordForm");

  form.elements["score"].value = currentScore;
  form.elements["generatedID"].value = newGeneratedID;

	form.submit();
	clearFormInputs();
  summary ();
	return false;

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
