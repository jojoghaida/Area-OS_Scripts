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

var colorStyle = 'blue';
var tickQuan = 150;
var bigTick = 5;
var tickSpan = 10;

var selector = two.makeStar(sW*.15,sH*.25,10,null,3);
selector.noStroke();
selector.fill = colorStyle;

var line = two.makeLine(0,sH,sW,sH);
line.linewidth = 3;
line.stroke = colorStyle;

for(i=0;i<tickQuan;i++){
  if(i/bigTick % 1 == 0){
    tick = two.makeLine(i*tickSpan,sH,i*tickSpan,sH-15);
    tick.stroke = colorStyle;
    integer = two.makeText(i,i*tickSpan,sH*.8-25);
  }else{
    tick = two.makeLine(i*tickSpan,sH,i*tickSpan,sH-10);
    tick.stroke = colorStyle;
  }
}

two.update();
