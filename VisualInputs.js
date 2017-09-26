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
inputsTwoScene.addEventListener('touchend', handleTouchEnd, false);

//standard input
// var rectangle = two.makeRectangle(0,0,sW,-sH);
// rectangle.fill = 'green';

var colorStyle = 'blue';
var tickQuan = 150;
var bigTick = 5;
var tickSpan = 10;

window.onload = function(){
  var svg = '<line class="cls-1" x1="582.06" y1="580.8" x2="582.06" y2="381.37"/><line class="cls-1" x1="174.96" y1="374.25" x2="360" y2="481.08"/><line class="cls-1" x1="137.95" y1="352.88" x2="174.95" y2="374.24"/><line class="cls-1" x1="360" y1="481.08" x2="582.06" y2="352.88"/><line class="cls-1" x1="495.71" y1="431.23" x2="557.39" y2="466.83"/><line class="cls-1" x1="397.02" y1="246.04" x2="582.06" y2="352.88"/><line class="cls-1" x1="137.95" y1="381.37" x2="137.95" y2="352.88"/><line class="cls-1" x1="347.67" y1="502.46" x2="360" y2="509.58"/><polyline class="cls-1" points="137.95 381.37 150.28 388.49 162.62 395.61 224.3 431.23 236.64 438.34 248.97 445.47 347.67 502.45"/><line class="cls-1" x1="360" y1="509.58" x2="360" y2="481.08"/><line class="cls-1" x1="483.37" y1="438.34" x2="557.39" y2="481.08"/><polyline class="cls-1" points="150.28 502.45 162.62 509.58 347.67 616.4"/><polyline class="cls-1" points="372.34 502.45 471.04 445.47 483.37 438.34 495.71 431.23 557.39 395.61 569.73 388.49 582.06 381.37"/><line class="cls-1" x1="360" y1="509.58" x2="372.34" y2="502.46"/><line class="cls-1" x1="174.96" y1="488.2" x2="347.67" y2="587.92"/><line class="cls-1" x1="162.62" y1="481.08" x2="174.95" y2="488.2"/><line class="cls-1" x1="582.06" y1="381.37" x2="582.06" y2="352.88"/><line class="cls-1" x1="137.95" y1="139.2" x2="174.95" y2="160.57"/><line class="cls-1" x1="174.95" y1="160.57" x2="397.02" y2="32.36"/><line class="cls-1" x1="360" y1="11" x2="397.02" y2="32.36"/><line class="cls-1" x1="137.95" y1="139.2" x2="360" y2="11"/><polyline class="cls-1" points="174.95 374.25 174.95 374.24 174.95 160.57"/><polyline class="cls-1" points="174.95 374.25 174.96 374.25 397.02 246.04"/><line class="cls-1" x1="397.02" y1="246.04" x2="397.02" y2="32.36"/><line class="cls-1" x1="137.95" y1="352.88" x2="137.95" y2="139.2"/><line class="cls-1" x1="150.28" y1="488.2" x2="347.67" y2="602.16"/><line class="cls-1" x1="150.28" y1="488.2" x2="162.62" y2="481.08"/><polyline class="cls-1" points="372.34 616.4 557.39 509.58 569.73 502.45"/><polyline class="cls-1" points="347.67 701.88 347.67 616.4 347.67 602.16 347.67 587.91 347.67 502.46 347.67 502.45"/><line class="cls-1" x1="347.67" y1="701.88" x2="360" y2="709"/><line class="cls-1" x1="360" y1="709" x2="360" y2="509.58"/><line class="cls-1" x1="545.06" y1="488.2" x2="557.39" y2="481.08"/><line class="cls-1" x1="372.34" y1="587.92" x2="545.05" y2="488.2"/><line class="cls-1" x1="557.39" y1="481.08" x2="569.73" y2="488.2"/><line class="cls-1" x1="360" y1="709" x2="372.34" y2="701.88"/><polyline class="cls-1" points="372.34 701.88 372.34 616.4 372.34 602.16 372.34 587.91 372.34 502.46 372.34 502.45"/><line class="cls-1" x1="372.34" y1="602.16" x2="569.73" y2="488.2"/><polyline class="cls-1" points="174.95 488.2 174.96 488.2 248.97 445.47"/><line class="cls-1" x1="162.62" y1="466.83" x2="224.3" y2="431.23"/><line class="cls-1" x1="162.62" y1="481.08" x2="236.64" y2="438.34"/><polyline class="cls-1" points="162.62 481.08 162.62 466.83 162.62 395.61"/><line class="cls-1" x1="162.62" y1="580.8" x2="162.62" y2="509.58"/><line class="cls-1" x1="150.28" y1="587.92" x2="162.62" y2="580.8"/><polyline class="cls-1" points="150.28 587.91 150.28 502.45 150.28 488.2 150.28 388.49"/><line class="cls-1" x1="137.95" y1="580.8" x2="150.28" y2="587.92"/><line class="cls-1" x1="137.95" y1="580.8" x2="137.95" y2="381.37"/><polyline class="cls-1" points="471.04 445.47 545.05 488.2 545.06 488.2"/><line class="cls-1" x1="557.39" y1="580.8" x2="557.39" y2="509.58"/><line class="cls-1" x1="569.73" y1="587.92" x2="582.06" y2="580.8"/><polyline class="cls-1" points="557.39 481.08 557.39 466.83 557.39 395.61"/><polyline class="cls-1" points="569.73 587.91 569.73 502.45 569.73 488.2 569.73 388.49"/><line class="cls-1" x1="557.39" y1="580.8" x2="569.73" y2="587.92"/><polygon class="cls-2" points="360 709 372.34 701.88 372.34 616.4 557.39 509.58 557.39 580.8 569.73 587.91 582.06 580.8 582.06 352.88 397.02 246.04 397.02 32.37 360 11 137.95 139.2 137.95 580.8 150.28 587.91 162.62 579.93 162.62 509.58 347.67 616.4 347.67 701.88 360 709"/><polygon class="cls-3" points="174.96 488.2 347.67 587.91 347.67 502.45 248.97 445.47 174.96 488.2"/><polygon class="cls-3" points="162.62 465.25 223.06 431.94 162.62 395.61 162.62 465.25"/><polygon class="cls-3" points="372.34 590 545.06 488.2 471.04 445.47 372.34 502.46 372.34 590"/><polygon class="cls-3" points="557.39 466.83 495.71 431.23 557.39 395.61 557.39 466.83"/></svg>';
  var glyph = two.interpret(svg);
  console.log(glyph);
  two.update();
}

var inputLabel = two.makeText('chair(s)',sH*1.2,sH*.35);
inputLabel.fill = colorStyle;
inputLabel.size = 24;
var selectorText = two.makeText(0,sH*.5,sH*.25);
selectorText.fill = colorStyle;
selectorText.size = 18;
var selector = two.makeStar(5*tickSpan,sH*.5,10,null,3);
selector.noStroke();
selector.fill = colorStyle;

var tickerGroup = []

var line = two.makeLine(0,sH,sW,sH);
line.linewidth = 3;
line.stroke = colorStyle;

for(i=0;i<tickQuan;i++){
  if(i/bigTick % 1 == 0){
    tick = two.makeLine(i*tickSpan+50,sH,i*tickSpan+50,sH-15);
    tick.stroke = colorStyle;
    integer = two.makeText(i,i*tickSpan+50,sH-25);
    integer.fill = colorStyle;
    tickerGroup.push(tick,integer);
  }else{
    tick = two.makeLine(i*tickSpan+50,sH,i*tickSpan+50,sH-10);
    tick.stroke = colorStyle;
    tickerGroup.push(tick);
  }
}

var inputSliderGroup = two.makeGroup(tickerGroup);

two.update();


//gesture effects*

var xDown = null;
var yDown = null; // may need later
var backPedalX = 0;
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
            if(xDiff>backPedalX){xAbsPos += -(Math.abs(xDiff-backPedalX));}else{xAbsPos += Math.abs(xDiff-backPedalX);}
            if(xAbsPos<-1500){xAbsPos=-1500;}
            inputSliderGroup.translation.x = xAbsPos;
            backPedalX = xDiff;
            selectorText.value = Math.round(Math.abs(xAbsPos/tickSpan));
            two.update();
        } else {
            /* right swipe */
            if(xDiff<backPedalX){xAbsPos += Math.abs(xDiff-backPedalX);}else{xAbsPos += -(Math.abs(xDiff-backPedalX));}
            if(xAbsPos>0){xAbsPos=0;}
            inputSliderGroup.translation.x = xAbsPos;
            backPedalX = xDiff;
            selectorText.value = Math.round(Math.abs(xAbsPos/tickSpan));
            two.update();
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
};

function handleTouchEnd(evt){
  backPedalX = 0;
  // setTimeout(alignSlider,1000);
};

function alignSlider(){
  console.log(xAbsPos);
  correctDifference = (xAbsPos/tickSpan % 1)*tickSpan;
  if(correctDifference*-1>=tickSpan/2){
    correctDifference = tickSpan-correctDifference;
  }else{
    correctDifference *= -1;
  }
  console.log(correctDifference);
  xAbsPos += correctDifference;
  console.log(xAbsPos);
  inputSliderGroup.translation.x = xAbsPos;
  two.update();
  selectorText.value = xAbsPos/tickSpan; // delete

}
