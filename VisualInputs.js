//two js form inputs

var inputsTwoScene = document.getElementById('inputCanvas');
var sW = inputsTwoScene.offsetWidth
var sH = inputsTwoScene.offsetHeight
var params = {width: sW, height: sH};

var two = new Two(params).appendTo(inputsTwoScene);

var rectangle = two.makeRectangle(0,0,-sW,-sH);
rectangle.fill = 'green';

var line = two.makeLine(0,sH,sW,sH);
line.linewidth = 3

two.update();
