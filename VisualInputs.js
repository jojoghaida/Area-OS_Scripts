//two js form inputs**

//setting canvas*
var inputsTwoScene = document.getElementById('inputCanvas');
var sW = inputsTwoScene.offsetWidth
var sH = inputsTwoScene.offsetHeight
var params = {width: sW, height: sH};
var two = new Two(params).appendTo(inputsTwoScene);

//mouse gestures*
inputsTwoScene.addEventListener('mousemove',disableOrbitCam);

//touch gestures*
inputsTwoScene.addEventListener('touchstart',disableOrbitCam);
inputsTwoScene.addEventListener('touchstart', handleTouchStart, false);
inputsTwoScene.addEventListener('touchmove', handleTouchMove, false);

//standard input
// var rectangle = two.makeRectangle(0,0,sW,-sH);
// rectangle.fill = 'green';

var colorStyle = 'blue';
var tickQuan = 150;
var bigTick = 5;
var tickSpan = 10;

var selector = two.makeStar(5*tickSpan,sH*.5,10,null,3);
selector.noStroke();
selector.fill = colorStyle;

var tickerGroup = []

var line = two.makeLine(0,sH,sW,sH);
line.linewidth = 3;
line.stroke = colorStyle;

for(i=0;i<tickQuan;i++){
  if(i/bigTick % 1 == 0){
    tick = two.makeLine(i*tickSpan,sH,i*tickSpan,sH-15);
    tick.stroke = colorStyle;
    integer = two.makeText(i,i*tickSpan,sH-25);
    integer.fill = colorStyle;
    tickerGroup.push(tick,integer);
  }else{
    tick = two.makeLine(i*tickSpan,sH,i*tickSpan,sH-10);
    tick.stroke = colorStyle;
    tickerGroup.push(tick);
  }
}

var inputSliderGroup = two.makeGroup(tickerGroup);

two.update();


//gesture effects*

var xDown = null;
var yDown = null; // may need later

var xAbsPos = 0;
var yAbsPos = 0; // may need later

function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
    yDown = evt.touches[0].clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* left swipe */
            xAbsPos += -(xDiff/4);
            if(xAbsPos<-300){xAbsPos=-300;}
            inputSliderGroup.translation.x = xAbsPos;
            two.update();
        } else {
            /* right swipe */
            xAbsPos += -(xDiff/4);
            if(xAbsPos>0){xAbsPos=0;}
            inputSliderGroup.translation.x = xAbsPos;
            two.update();
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    // xDown = null;
    // yDown = null;
};
