var questions;
var xhr = new XMLHttpRequest();
var emailContainer = document.querySelector(".emailContainer");


var search = new URLSearchParams(location.search);

xhr.open("GET", "https://floating-peak-23328.herokuapp.com/questions_lists/" + search.get("id") + ".json");
xhr.onload = function () {

  questions = JSON.parse(xhr.response);
  if (questions && Array.isArray(questions)) {
    init();
  } else {
    emailContainer.innerText = "Wrong URL. Sorry no question for this interview.";
  }
};
if (!search.get("id")) {
  emailContainer.innerText = "Wrong URL. Sorry no question for this interview.";
} else {
  xhr.send();
}
function init() {
  var dataToSend = {
    answers: [],
    token: search.get("id")
  };

  var switchContainer = document.querySelector(".switchContainer");
  var emailField = document.querySelector(".emailField");
  var voiceRecordingScreen = document.querySelector(".voiceRecordingScreen");

  emailField.addEventListener("keyup", redisableNextButton);

  switchContainer.addEventListener("click", function () {
    hide(emailContainer);
    show(voiceRecordingScreen);
  });
  function redisableNextButton(e) {
    dataToSend.email = emailField.value;
    console.log(dataToSend.email);
    var emailFieldCondition = emailField.checkValidity();
    if (emailFieldCondition == true) {
      switchContainer.disabled = false;
    } else {
      switchContainer.disabled = true;
    }
  }

  var threeMinutes = 60 * 3 - 1;
  var countDown = document.querySelector(".countDown");
  var intervalId;

  var startButton = document.querySelector(".startButton");
  var finishButton = document.querySelector(".finishButton");
  var repeatButton = document.querySelector(".repeatButton");
  var submitButton = document.querySelector(".submitButton");

  startButton.addEventListener("click", function () {
    currentQuestion.status = 'recording';
    renderQuestion(currentQuestion);

    startTimer(threeMinutes, countDown);
  });
  finishButton.addEventListener("click", function () {
    currentQuestion.status = 'recorded';
    renderQuestion(currentQuestion);

    clearInterval(intervalId);
    show(nextQuestionButton);

  });
  repeatButton.addEventListener("click", function () {
    currentQuestion.status = 'recording';
    renderQuestion(currentQuestion);

    clearInterval(intervalId);
    startTimer(threeMinutes, countDown);
  });
  submitButton.addEventListener("click", function () {
    var xhr = new XMLHttpRequest();
    xhr.open("POST","https://floating-peak-23328.herokuapp.com/answers/upload");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({answer:dataToSend}));
    voiceRecordingScreen.innerText = "Answers are submiting. Plase wait.";
    xhr.onload = function () {
      voiceRecordingScreen.innerText = "We will now process your interview. This can take up to 48h.
      You will receive an eMail from us very soon."
    }
  });
  function show(el) {
    el.classList.remove("hidden");
  }

  function hide(el) {
    el.classList.add("hidden");
  }

  var containers = document.querySelectorAll(".container");
  var currentContainerIndex = 0;
  var currentContainer = containers[currentContainerIndex];

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains('next')) {
      hide(currentContainer);
      currentContainerIndex++;
      currentContainer = containers[currentContainerIndex];
      show(currentContainer);
    }
  });

  var currentQuestionIndex = 0;
  var currentQuestion = questions[currentQuestionIndex];
  var lastQuestionIndex = parseInt(questions[0].total) - 1;
  var startOrder = document.querySelector(".startOrder");
  var endOrder = document.querySelector(".endOrder");
  var questionHeader = document.querySelector(".questionHeader");

  function renderQuestion(question) {
    startOrder.innerText = question.order;
    endOrder.innerText = question.total;
    questionHeader.innerText = question.text;
    voiceRecordingScreen.setAttribute('status', question.status || 'not-started');
    if (currentQuestionIndex === questions.length - 1) {
      voiceRecordingScreen.setAttribute('last', 'true');
    } else {
      voiceRecordingScreen.setAttribute('last', 'false');
    }
  }

  renderQuestion(questions[currentQuestionIndex]);

  var nextQuestionButton = document.querySelector(".nextButton");
  nextQuestionButton.addEventListener("click", function () {
    currentQuestionIndex++;
    currentQuestion = questions[currentQuestionIndex];

    show(previousQuestionButton);
    renderQuestion(questions[currentQuestionIndex]);
    if (currentQuestionIndex == lastQuestionIndex) {
      hide(nextQuestionButton);
    }
    countDown.innerText = "03:00";

  });
  var previousQuestionButton = document.querySelector(".previousButton");
  previousQuestionButton.addEventListener("click", function () {
    currentQuestionIndex--;
    currentQuestion = questions[currentQuestionIndex];

    show(nextQuestionButton);
    renderQuestion(questions[currentQuestionIndex]);
    if (currentQuestionIndex == 0) {
      hide(previousQuestionButton);
    }

    countDown.innerText = "03:00";
  });


  function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    intervalId = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.innerText = minutes + ":" + seconds;

      if (--timer < 0) {
        currentQuestion.status = 'recorded';
        renderQuestion(currentQuestion);

        clearInterval(intervalId);
        show(nextQuestionButton);
        mediaRecorder.stop();
      }
    }, 1000);
  }

  var mediaRecorder;

  if (!('mediaDevices' in navigator) || !('MediaRecorder' in window)) {
    voiceRecordingScreen.innerText = 'Not available on iOS. \n Please try it again on your Desktop PC or Android. \n\nThank you!';
  } else {
    navigator.mediaDevices.getUserMedia({audio: true, video: false})
      .then(function (mediaStream) {
        var chunks = [];
        mediaRecorder = new MediaRecorder(mediaStream);

        startButton.addEventListener("click", function () {
          mediaRecorder.start();
        });

        finishButton.addEventListener("click", function () {
          mediaRecorder.stop();
        });

        repeatButton.addEventListener("click", function () {
          mediaRecorder.start();
        });

        mediaRecorder.ondataavailable = function (e) {
          chunks.push(e.data);
        };
        mediaRecorder.onstop = function () {
          var blob = new Blob(chunks, {'type': 'audio/ogg; codecs=opus'});

          var reader = new window.FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = function () {
            dataToSend.answers[currentQuestionIndex] = {
              answer_audio: reader.result,
              question_id: questions[currentQuestionIndex].id
            };
            chunks = [];
            if(questions.length == dataToSend.answers.length) {
              show(submitButton);
            }
            console.log(dataToSend);
          };
        }
      });
  }
}
function onFbLoaded(details) {
  checkLoginState(function (fbData) {
    console.log(fbData);
    if (fbData.authResponse) {
      dataToSend.facebook_connect = fbData.authResponse
    }
  });
}


function checkLoginState(cb) {
  FB.getLoginStatus(function (response) {
    cb(response);
  });
}


window.fbAsyncInit = function () {
  FB.init({
//      appId: '1966593120284386',
    appId: '1128879343912771',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v2.10'
  });
  FB.AppEvents.logPageView();


  FB.Event.subscribe('auth.authResponseChange', function (response) {
    if (response.status === 'connected') {
      console.log("<br>Connected to Facebook");
      //SUCCESS
      FB.api('/me', {locale: 'en_EN', fields: 'name, email'},
        function (response) {
          console.log(response);
          emailField.value = response.email;
          dataToSend.email = response.email;
          dataToSend.name = response.name;
          switchContainer.disabled = false;
        }
      );

    }
    else if (response.status === 'not_authorized') {
      console.log("Failed to Connect");

      //FAILED
    } else {
      console.log("Logged Out");

      //UNKNOWN ERROR
    }
  });

};


(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
