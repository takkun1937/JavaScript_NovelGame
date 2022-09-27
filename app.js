//require('../css/app.css');

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var bgImage = new function () {
  this.x = 0
  this.y = 0;

  this.width = canvas.width;
  this.height = canvas.height;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "./images/ring.jpeg";
    this.image.onload = loader;

  }

  this.render = function () {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var personImage = new function () {
  this.y = 0;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "./images/asakura.png";
    this.image.onload = loader;
  }

  this.render = function () {

    this.aspect = this.image.width / this.image.height;

    this.width = canvas.height * this.aspect;
    this.height = canvas.height;

    this.x = canvas.width / 2 - this.width / 2;

    ctx.drawImage(this.image, this.x - 300, this.y, this.width, this.height);
  }
}

var personImage2 = new function () {
    this.y = 0;
  
    this.loadImage = function () {
      this.image = new Image();
      this.image.src = "./images/meiweza.png";
      this.image.onload = loader;
    }
  
    this.render = function () {
  
      this.aspect = this.image.width / this.image.height;
  
      this.width = canvas.height * this.aspect;
      this.height = canvas.height;
  
      this.x = canvas.width / 2 - this.width / 2;
  
      ctx.drawImage(this.image, this.x + 300, this.y, this.width, this.height);
    }
  }

  var personImage3 = new function () {
    this.y = 0;
  
    this.loadImage = function () {
      this.image = new Image();
      this.image.src = "./images/satan.png";
      this.image.onload = loader;
    }
  
    this.render = function () {
  
      this.aspect = this.image.width / this.image.height;
  
      this.width = canvas.height * this.aspect;
      this.height = canvas.height;
  
      this.x = canvas.width / 2 - this.width / 2;
  
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }


var messageBox = new function () {
  this.x = 0;

  this.loadImage = function () {
    this.image = new Image();
    this.image.src = "./images/message_box.png";
    this.image.onload = loader;
  }

  this.render = function () {

    this.aspect = this.image.width / this.image.height;

    this.width = canvas.width;
    this.height = canvas.height / this.aspect;

    this.marginBottom = 20;
    this.y = canvas.height - this.height - this.marginBottom;

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height + this.marginBottom);
  }
}

var myText = new function () {

  this.render = function () {
    var messageBoxInnerWidth = messageBox.width - 40;
    var messageBoxPaddingTop = 55;
    var messageBoxPaddingLeft = 15;

    var s = "";
    var sentenceArray = text.split("");

    var kaigyouHeight = 0;

    for (var i = 0; i < sentenceArray.length; i++) {
      s += sentenceArray[i];
      var textWidth = ctx.measureText(s).width;

      if(textWidth > messageBoxInnerWidth) {
        ctx.fillText(s, messageBoxPaddingLeft, messageBox.y + kaigyouHeight + messageBoxPaddingTop);

        kaigyouHeight += 30;
        s = "";
      }
    }

    ctx.fillStyle = "#fff";
    ctx.font = "30px serif";
    ctx.textAlign = "left";

    ctx.fillText(s, messageBoxPaddingLeft, messageBox.y + kaigyouHeight + messageBoxPaddingTop);
  }
}

var sentences = [
"(朝倉〇来)おい、メイウェザー！俺と闘え。",
"言葉が出来ないので、「朝の6時に起こしてください」",
"という簡単なことが言えない。",
"そこでまず、腕をパタパタさせて飛ぶまねをし、コケコッコーと鳴いた。",
"それから指を使って、「６」を何度も見せた。",
"そうしたらボーイが「分かった、分かった」というふうにニコニコと大きくうなずいて、向こうに行った。",
"しばらくしたら、ゆで卵を6個持ってきた。"
];

var Loader = function (expectedCnt, callback) {
  var cnt = 0;
  return function() {
    cnt++;
    if(cnt == expectedCnt) {
      callback();
    }
  }
}

var loader = Loader(3, function () {
  update();
});

bgImage.loadImage();
personImage.loadImage();
personImage2.loadImage();
personImage3.loadImage();
messageBox.loadImage();

var sentenceIndex = 0;

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let msAudio = document.getElementById('message');

  if(sentenceIndex > sentences.length - 1) {
    bgImage.render();
    //alert("終了です");
    location.reload();
  } else {
    msAudio.play();
    bgImage.render();
    personImage.render();
    personImage2.render();
    personImage3.render();
    messageBox.render();

    myText.render(text=sentences[sentenceIndex]);
    sentenceIndex++;
  }
}

canvas.addEventListener("click", function(){
  update();
});