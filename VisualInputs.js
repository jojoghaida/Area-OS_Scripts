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

var colorStyle = 0x26D8A5;
var tickQuan = 150;
var bigTick = 5;
var tickSpan = 10;


var line = two.makeLine(0,sH*.8,sW,sH*.8);
line.linewidth = 2;
line.stroke = colorStyle;

//extLength/4 % 1 == 0
for(i=0;i<tickQuan;i++){
  if(i/bigTick % 1 == 0){
    tick = two.makeLine(i*tickSpan,sH*.8,i*tickSpan,sH*.8-15);
    tick.stroke = colorStyle;
  }else{
    tick = two.makeLine(i*tickSpan,sH*.8,i*tickSpan,sH*.8-10);
    tick.stroke = colorStyle;
  }
}

two.update();
