//two js form inputs

//setting canvas
var inputsTwoScene = document.getElementById('inputCanvas');
var sW = inputsTwoScene.offsetWidth
var sH = inputsTwoScene.offsetHeight
var params = {width: sW, height: sH};
var two = new Two(params).appendTo(inputsTwoScene);


//standard input
// var rectangle = two.makeRectangle(0,0,sW,-sH);
// rectangle.fill = 'green';

var line = two.makeLine(0,sH*.8,sW,sH*.8);
line.linewidth = 3

two.update();
