//VisualFeedback

//setting canvas*
var feedbackTwoScene = document.getElementById('areaoshead');
var vfsw = feedbackTwoScene.offsetWidth
var vfsh = feedbackTwoScene.offsetHeight
var paramsToo = {width: vfsw, height: vfsh};
var twoToo = new Two(params).appendTo(feedbackTwoScene);
var titleTop = null;
var titleLeft = null;
var titleRight = null;
var headerMode = null;
feedbackTwoScene.addEventListener('mousemove',disableOrbitCam);

function headerStandard(){
  twoToo.clear();

  titleTop = twoToo.makeText('AREA OS',vfsw/2,vfsh/2+10); //get glyph size to get y-value
  titleTop.fill = aOS_ColorStyles.aOS_OSblue;
  titleTop.size = 24;
  titleTop.family = 'Karla';
  titleTop.alignment = 'center';

  titleLeft = twoToo.makeText('Reset',20,vfsh/2+10); //get glyph size to get y-value
  titleLeft.fill = aOS_ColorStyles.aOS_OSblue;
  titleLeft.size = 14;
  titleLeft.family = 'Karla';
  titleLeft.alignment = 'left';

  titleRight = twoToo.makeText('About',vfsw-20,vfsh/2+10); //get glyph size to get y-value
  titleRight.fill = aOS_ColorStyles.aOS_OSblue;
  titleRight.size = 14;
  titleRight.family = 'Karla';
  titleRight.alignment = 'right';


  twoToo.update();

  titleRight._renderer.elem.addEventListener('click', function(){console.log("yo")});
  titleLeft._renderer.elem.addEventListener('click', function(){location.reload()});
  headerMode = 0;
}
headerStandard();

function menuHeaderBasic(){
  console.log("menu header");
  titleTop.value = 'Menu';
  titleLeft.value = 'Advanced';
  titleRight.value = 'close';
  twoToo.update();
  titleRight._renderer.elem.addEventListener('click', function(){
    console.log("closing menu");
    shrinkInput();
    headerStandard();
    sliderInput(basicChairSL);
    pressureInput();
  });
  titleLeft._renderer.elem.addEventListener('click', function(){location.reload()});
  headerMode = 1;
}
