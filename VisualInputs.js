//two js form inputs**
//setting canvas*
var inputsTwoScene = document.getElementById('inputCanvas');
var sW = inputsTwoScene.offsetWidth
var sH = inputsTwoScene.offsetHeight
var params = {width: sW, height: sH};
var twoJS = new Two(params).appendTo(inputsTwoScene);

//mouse gestures*
inputsTwoScene.addEventListener('mousemove',disableOrbitCam);
inputsTwoScene.addEventListener('touchstart',disableOrbitCam);

var iconbox = document.getElementById('glyphbox');
var menu = document.getElementById('areaosmenu');


function selectorUI(){
  console.log('selectorUI init');
  initMissive = twoJS.makeText('Select Items',sW*.5,sH*.5);
  initMissive.fill = 'red';
  initMissive.size = 24;
  initMissive.family = 'Karla';
  initMissive.alignment = 'center';
  twoJS.update();

}


var selectorText = null;

function sliderInput(thisSliderStyle){
  //if no scene return
  console.log(thisSliderStyle);
  twoJS.clear();
  twoJS.update();
  // iconbox = document.getElementById('glyphbox');
  // iconbox.style.display = 'block';
  initInputTouchListeners();

  // slider styles
  colorStyle = thisSliderStyle.color;//aOS_ColorStyles.basicChairColor;
  tickQuan = 150;
  bigTick = 5;
  tickSpan = 10;
  leftWhiteSpace = 50;

  inputLabel = twoJS.makeText('Chair(s)',leftWhiteSpace+60,sH*.37); //get glyph size to get y-value
  inputLabel.fill = colorStyle;
  inputLabel.size = 24;
  inputLabel.family = 'Karla';
  inputLabel.alignment = 'left';


  selectorText = twoJS.makeText(0,leftWhiteSpace,sH*.25);
  selectorText.fill = colorStyle;
  selectorText.size = 18;
  selectorText.family = 'Karla';
  selectorText.value = 0;

  selectorGlyph = twoJS.makeStar(5*tickSpan,leftWhiteSpace,10,null,3);
  selectorGlyph.rotation = Math.PI;
  selectorGlyph.noStroke();
  selectorGlyph.fill = colorStyle;

  tickerGroup = []

  var line = twoJS.makeLine(0,sH,sW,sH);
  line.linewidth = 3;
  line.stroke = colorStyle;

  for(i=0;i<tickQuan;i++){
    if(i/bigTick % 1 == 0){
      tick = twoJS.makeLine(i*tickSpan+leftWhiteSpace,sH,i*tickSpan+leftWhiteSpace,sH-15);
      tick.stroke = colorStyle;
      integer = twoJS.makeText(i,i*tickSpan+leftWhiteSpace,sH-25);
      integer.fill = colorStyle;
      integer.family = 'Karla';
      tickerGroup.push(tick,integer);
    }else{
      tick = twoJS.makeLine(i*tickSpan+leftWhiteSpace,sH,i*tickSpan+leftWhiteSpace,sH-10);
      tick.stroke = colorStyle;
      tickerGroup.push(tick);
    }
  }

  inputSliderGroup = twoJS.makeGroup(tickerGroup);

  // submit styles
  submitThreshold = 200;
  swipeUpGlyph = twoJS.makeStar(sW-40,15,5,null,3);
  // swipeUpGlyph.rotation = Math.PI;
  swipeUpGlyph.noStroke();
  swipeUpGlyph.fill = colorStyle;

  swipeUpTxt = twoJS.makeText('submit',sW-40,30);
  swipeUpTxt.fill = colorStyle;
  swipeUpTxt.size = 12;
  swipeUpTxt.family = 'Karla';
  swipeUpTxt.alignment = 'center';

  clrStop1 = new Two.Stop(.9,'white',0);
  clrStop2 = new Two.Stop(1,colorStyle,1);
  clrStop3 = new Two.Stop(.75,colorStyle,1);
  swipeUpGradient = twoJS.makeLinearGradient(sW,-sH/2,sW,sH/2,clrStop1,clrStop2);
  submitRec = twoJS.makeRectangle(sW/2,sH/2,sW,sH);
  submitRec.fill = swipeUpGradient;

  ungrade = null;
  sendInput = null;

  twoJS.update();
}

// setTimeout(function(){sliderInput(basicChairSL)},5000);

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
            twoJS.update();
        } else {
            /* right swipe */
            if(xDiff<backPedalX){xAbsPos += Math.abs(xDiff-backPedalX);}else{xAbsPos += -(Math.abs(xDiff-backPedalX));}
            if(xAbsPos>0){xAbsPos=0;}
            inputSliderGroup.translation.x = xAbsPos;
            backPedalX = xDiff;
            selectorText.value = Math.round(Math.abs(xAbsPos/tickSpan));
            if(drawBool == false){drawElements();}
            twoJS.update();
        }
    } else {
        if ( yDiff > 0 ) {
            /* up swipe */
            clrStop1.offset = .9-(yDiff/submitThreshold);
            clrStop2.offset = 1;
            twoJS.update();
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
    twoJS.update();
  }else{clearInterval(ungrade);}
}

function submital(){
  if(clrStop2.offset > 0){
    clrStop2.offset -= .1;
    twoJS.update();
  }else{
    initInputTouchListeners();
    clearInterval(sendInput);
    twoJS.update();
  }
  clearInterval(editMainCrv); // temporary for testing; stops propogation
  editMainCrv = null; // temporary for testing; stops propogation
}


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
  twoJS.clear();
  twoJS.update();

  // menu.style.display = 'block';
  // iconbox.style.display = 'none';

  areaOStoo = twoJS.makeText("Existing Spaces >",15,35);
  areaOStoo.fill = aOS_ColorStyles.aOS_OSblue;
  areaOStoo.size = 18;
  areaOStoo.family = 'Karla';
  areaOStoo.alignment = 'left';
  // areaOStoo.value = "Switch to desk rental service";
  twoJS.update();

}

function shrinkInput(){
  twoJS.clear();
  bottomInput.style.height = "100px";
}


function loadMenuItems(){
  var list = [];
  for (property in menuObjects) {
    list.push(property);
  }
  // console.log(menuObjects.list[0]);
}
loadMenuItems();
