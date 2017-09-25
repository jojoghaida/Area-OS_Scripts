//two js form inputs

var inputsTwoScene = document.getElementById('inputCanvas');
var params = {width: inputsTwoScene.offsetWidth, height: inputsTwoScene.offsetHeight};

var two = new Two(params).appendTo(inputsTwoScene);


var line = two.makeLine(0,0,15,15);
two.update();
