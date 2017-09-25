//two js form inputs

var inputsTwoScene = document.getElementById('inputCanvas');
var sW = inputsTwoScene.offsetWidth
var sH = inputsTwoScene.offsetHeight
var params = {width: sW, height: sH};

var two = new Two(params).appendTo(inputsTwoScene);


var line = two.makeLine(0,sH/1.5,sW,sH/1.5);
two.update();
