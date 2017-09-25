//two js form inputs

var inputsTwoScene = document.getElementById('inputCanvas');
var sW = inputsTwoScene.offsetWidth
var sH = inputsTwoScene.offsetHeight
var params = {width: sW, height: sH};

var two = new Two(params).appendTo(inputsTwoScene);


var line = two.makeLine(0,sH*.90,sW,sH*.90);
line.linewidth = 3
two.update();
