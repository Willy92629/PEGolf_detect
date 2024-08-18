var stdNum = 1
var maxStd = 0;
var swingNum = 1;
var swingCount = 0;

//carouselIndicators
//carouselInner

function loadJSON(stdIdx) {
    fetch('./stdscore.json')
      .then(response => response.json())
      .then(data => { 
        // Use the JSON data here
        //console.log(stdJson[0].std);
        var stdData = data[stdIdx-1];
        maxStd = data.length;
        swingCount = stdData.swingCount;
        //swingNum = swingNum;
        //console.log(`swingCount:${swingCount}`);
        //console.log(`loadJSON()=> maxStd:${maxStd}`);
        console.log(stdData);

        document.getElementById("stdTitle").innerHTML = `Student ${stdData.std}`;

        var swingScore = stdData.swingScore;
        var totalScore = 0;
        for (var i = 0; i < swingScore.length; i++) {
            var scoreStr = `swingScord${i+1}`;
            if(swingScore[i] != 0) {
                document.getElementById(scoreStr).innerHTML = `${swingScore[i]}`;
            } else {
                document.getElementById(scoreStr).innerHTML = "0";
            }

            if(swingScore[i] <= 3) {
                document.getElementById(scoreStr).classList.add("color-red");
            } else {
                document.getElementById(scoreStr).classList.remove("color-red");
            }
            document.getElementById(scoreStr).innerHTML = `${swingScore[i]}`;
            totalScore += swingScore[i];
        }
        document.getElementById("totalScore").innerHTML = `${totalScore}`;

        var carouselIndicators = document.getElementById("carouselIndicators");
        var slideBtn = `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" aria-label="Slide 1" class="active" aria-current="true"></button>`;

        var carouselInner = document.getElementById("carouselInner");
        var ImgHTML = `<div class="carousel-item active"><img src="${stdData.swingPics[0]}" class="d-block w-100 img-fluid" alt="swing 1"></div>`;

        for(var i = 1; i < stdData.swingCount; i++) {
            slideBtn += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`;
            carouselIndicators.innerHTML = slideBtn;

            var picPath = stdData.swingPics[i];
            var altStr = `swing ${i+1}`;
            ImgHTML += `<div class="carousel-item"><img src="${picPath}" class="d-block w-100 img-fluid" alt="${altStr}"></div>`;
            carouselInner.innerHTML = ImgHTML;
        }


        //document.getElementById("stdScore").innerHTML = `${stdData.score}`;


      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  function switchSwingDetail(stdIdx, swingIdx) {
    //console.log(`stdIdx: ${stdIdx}, swingIdx: ${swingIdx}`);
    fetch('./stdscore.json')
      .then(response => response.json())
      .then(data => { 
        // Use the JSON data here
        //console.log(`swingIdx: ${swingIdx}`);
        var stdData = data[stdIdx-1];
        var swingScore = stdData.swingScore[swingIdx-1];
        document.getElementById("totalScore").innerHTML = `${swingScore} / 5`;
        var stdSwingStep = stdData.stepState[swingIdx-1].state;
        var comment = stdData.comment;
        
        //console.log(stdSwingStep);
        document.getElementById("swingNum").innerHTML = `Swing ${swingIdx}`;

        for (var i = 0; i < stdSwingStep.length; i++) {
            var stepStr = `step${i+1}`;
            document.getElementById(stepStr).innerHTML = stdSwingStep[i]
        }
        document.getElementById("swingScore").innerHTML = `${swingScore} / 5`;
        document.getElementById("comment").innerHTML = `${comment}`;

        if(swingScore <= 3) {
            document.getElementById("swingScore").classList.add("color-red");
        } else {
            document.getElementById("swingScore").classList.remove("color-red");
        }

        var carouselInner = document.getElementById("carouselInner");
        var ImgHTML = `<div class="carousel-item active"><img src="${stdData.swingPics[swingIdx-1]}" class="d-block w-100 img-fluid" alt="swing 1"></div>`;

        var carouselIndicators = document.getElementById("carouselIndicators");
        if(swingIdx-1 == 0){
            var slideBtn = `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" aria-label="Slide 1" class="active" aria-current="true"></button>`;
        }else{
            var slideBtn = `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" aria-label="Slide 1" ></button>`;
        }
        for(var i = 1; i < stdData.swingCount; i++) {
            if(i == swingIdx-1){
                slideBtn += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}" class="active" aria-current="true"></button>`;
            }else{
                slideBtn += `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${i+1}"></button>`;
            }
            carouselIndicators.innerHTML = slideBtn;

            var picPath = stdData.swingPics[i];
            var altStr = `swing ${i+1}`;
            ImgHTML += `<div class="carousel-item"><img src="${picPath}" class="d-block w-100 img-fluid" alt="${altStr}"></div>`;
            carouselInner.innerHTML = ImgHTML;
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } 

  function setBtn() {
    //console.log(stdNum);
    var preBtn = document.getElementById("previousStd");
    var nextStd = document.getElementById("nextStd");

    preBtn.classList.remove("none");
    nextStd.classList.remove("none");

    if (stdNum == 1) {
        preBtn.classList.add("none");
    } 

    //console.log(`setBtn()=> stdNum:${stdNum}, maxStd:${maxStd}`);
    if (stdNum == maxStd) {
        nextStd.classList.add("none");
    }
}