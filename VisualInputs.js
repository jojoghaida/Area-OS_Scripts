//two js form inputs

var inputsTwoScene = document.getElementById('inputCanvas');
var params = {width: inputsTwoScene.offsetWidth, height: inputsTwoScene.offsetHeight};

var two = new Two(params).appendTo(inputsTwoScene);


var line = two.makeLine(0,50,100,50);
two.update();
