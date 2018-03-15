//two js form inputs**
//setting canvas*
var inputsTwoScene = document.getElementById('inputCanvas');
var sW = inputsTwoScene.offsetWidth
var sH = inputsTwoScene.offsetHeight
var params = {width: sW, height: sH};
var two = new Two(params).appendTo(inputsTwoScene);

//mouse gestures*
inputsTwoScene.addEventListener('mousemove',disableOrbitCam);
inputsTwoScene.addEventListener('touchstart',disableOrbitCam);





//standard input


// var glyph = null;
// window.onload = function(){
//   var svg = document.getElementById('basicChairGlyph');
//   var getSVG = svg.getElementsByTagName('svg')[0];
//   console.log(svg);
//   console.log(getSVG);
//   glyph = two.interpret(getSVG);
//   console.log(glyph);
//   // glyph.linewidth = 200;
//   glyph.translation.y = -100;
//   glyph.scale = 5;
//   two.update();
//
// }
var selectorText = null;

function sliderInput(thisSliderStyle){

  initInputTouchListeners();

  // slider styles
  colorStyle = thisSliderStyle.color;//aOS_ColorStyles.basicChairColor;
  tickQuan = 150;
  bigTick = 5;
  tickSpan = 10;
  leftWhiteSpace = 50;

  inputLabel = two.makeText('Chair(s)',leftWhiteSpace+60,sH*.37); //get glyph size to get y-value
  inputLabel.fill = colorStyle;
  inputLabel.size = 24;
  inputLabel.family = 'Karla';
  inputLabel.alignment = 'left';


  selectorText = two.makeText(0,leftWhiteSpace,sH*.25);
  selectorText.fill = colorStyle;
  selectorText.size = 18;
  selectorText.family = 'Karla';
  selectorText.value = 0;

  selectorGlyph = two.makeStar(5*tickSpan,leftWhiteSpace,10,null,3);
  selectorGlyph.rotation = Math.PI;
  selectorGlyph.noStroke();
  selectorGlyph.fill = colorStyle;

  tickerGroup = []

  var line = two.makeLine(0,sH,sW,sH);
  line.linewidth = 3;
  line.stroke = colorStyle;

  for(i=0;i<tickQuan;i++){
    if(i/bigTick % 1 == 0){
      tick = two.makeLine(i*tickSpan+leftWhiteSpace,sH,i*tickSpan+leftWhiteSpace,sH-15);
      tick.stroke = colorStyle;
      integer = two.makeText(i,i*tickSpan+leftWhiteSpace,sH-25);
      integer.fill = colorStyle;
      integer.family = 'Karla';
      tickerGroup.push(tick,integer);
    }else{
      tick = two.makeLine(i*tickSpan+leftWhiteSpace,sH,i*tickSpan+leftWhiteSpace,sH-10);
      tick.stroke = colorStyle;
      tickerGroup.push(tick);
    }
  }

  inputSliderGroup = two.makeGroup(tickerGroup);

  // submit styles
  submitThreshold = 200;
  swipeUpGlyph = two.makeStar(sW-40,15,5,null,3);
  // swipeUpGlyph.rotation = Math.PI;
  swipeUpGlyph.noStroke();
  swipeUpGlyph.fill = colorStyle;

  swipeUpTxt = two.makeText('submit',sW-40,30);
  swipeUpTxt.fill = colorStyle;
  swipeUpTxt.size = 12;
  swipeUpTxt.family = 'Karla';
  swipeUpTxt.alignment = 'center';

  clrStop1 = new Two.Stop(.9,'white',0);
  clrStop2 = new Two.Stop(1,colorStyle,1);
  clrStop3 = new Two.Stop(.75,colorStyle,1);
  swipeUpGradient = two.makeLinearGradient(sW,-sH/2,sW,sH/2,clrStop1,clrStop2);
  submitRec = two.makeRectangle(sW/2,sH/2,sW,sH);
  submitRec.fill = swipeUpGradient;

  ungrade = null;
  sendInput = null;

  two.update();
}

// window.onload = sliderInput(basicChairSL);
setTimeout(function(){sliderInput(basicChairSL)},2000);

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
            if(drawBool == false){drawElements();}
            two.update();
        } else {
            /* right swipe */
            if(xDiff<backPedalX){xAbsPos += Math.abs(xDiff-backPedalX);}else{xAbsPos += -(Math.abs(xDiff-backPedalX));}
            if(xAbsPos>0){xAbsPos=0;}
            inputSliderGroup.translation.x = xAbsPos;
            backPedalX = xDiff;
            selectorText.value = Math.round(Math.abs(xAbsPos/tickSpan));
            if(drawBool == false){drawElements();}
            two.update();
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            clrStop1.offset = .9-(yDiff/submitThreshold);
            clrStop2.offset = 1;
            two.update();
            if(yDiff>submitThreshold){ //submitThreshold<<
              clrStop1.offset = 0;
              removeInputListeners();
              sendInput = setInterval(submital,10);
            }
        } else {
            /* down swipe */
        }
    }
};

function handleTouchEnd(evt){
  backPedalX = 0;
  ungrade = setInterval(unGradient,10);
};

function unGradient(){
  if(clrStop1.offset < .9 && clrStop1.offset != 0){
    clrStop1.offset += .01;
    two.update();
  }else{clearInterval(ungrade);}
}

function submital(){
  if(clrStop2.offset > 0){
    clrStop2.offset -= .1;
    two.update();
  }else{
    initInputTouchListeners();
    clearInterval(sendInput);
    two.update();
  }
  clearInterval(editMainCrv); // temporary for testing; stops propogation
  editMainCrv = null; // temporary for testing; stops propogation
}

// function alignSlider(){
//   correctDifference = (xAbsPos/tickSpan % 1)*tickSpan;
//   if(correctDifference*-1>=tickSpan/2){
//     correctDifference = tickSpan-correctDifference;
//   }else{
//     correctDifference *= -1;
//   }
//   xAbsPos += correctDifference;
//   inputSliderGroup.translation.x = xAbsPos;
//   two.update();
//   selectorText.value = xAbsPos/tickSpan; // delete
//
// }

//touch gestures*
function initInputTouchListeners(){
  inputsTwoScene.addEventListener('touchstart', handleTouchStart, false);
  inputsTwoScene.addEventListener('touchmove', handleTouchMove, false);
  inputsTwoScene.addEventListener('touchend', handleTouchEnd, false);
}

function removeInputListeners(){
  inputsTwoScene.removeEventListener('touchstart', handleTouchStart, false);
  inputsTwoScene.removeEventListener('touchmove', handleTouchMove, false);
  inputsTwoScene.removeEventListener('touchend', handleTouchEnd, false);
}

function expandInput(){
  bottomInput.style.height = screen.height - feedbackTwoScene.offsetHeight + "px";
  two.clear();
  two.update();

  areaOStoo = two.makeText("Existing Spaces >",15,35);
  areaOStoo.fill = aOS_ColorStyles.aOS_OSblue;
  areaOStoo.size = 18;
  areaOStoo.family = 'Karla';
  areaOStoo.alignment = 'left';

  // areaOStoo.value = "Switch to desk rental service";
  two.update();

}

function shrinkInput(){
  two.clear();
  bottomInput.style.height = "100px";
}
