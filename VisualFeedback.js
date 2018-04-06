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
  if(runPrompt != null){clearInterval(runPrompt);}
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
  if(runPrompt != null){clearInterval(runPrompt);}
  titleTop.value = 'Menu';
  titleLeft.value = 'Advanced';
  titleRight.value = 'close';
  twoToo.update();
  titleRight._renderer.elem.addEventListener('click', function(){
    shrinkInput();
    headerStandard();
    sliderInput(basicChairSL);
    pressureInput();
  });
  titleLeft._renderer.elem.addEventListener('click', function(){location.reload()});
  headerMode = 1;
}

var runPrompt = null;

function bannerCommunicator(missive = 'write a communication...'){
  console.log(missive);
  //need to clear scen and rebuild to avoid overlaying
  titleTop.translation.x  = vfsw;
  titleTop.value = missive;
  titleTop.size = 14;
  titleTop.alignment = 'left';

  clip = twoToo.makeRectangle(vfsw/2,vfsh/2,vfsw - 150,vfsh);
  // clr1 = new Two.Stop(0,'blue',.25);
  // clr2 = new Two.Stop(.25,'white',.75);
  // clr3 = new Two.Stop(.75,'red',1);
  // gradient = twoJS.makeLinearGradient(-vfsw/2,0,0,0,clr1,clr2,clr3);
  clip.fill = 'red';
  clip.stroke = 1;
  clip.opacity = .5;
  clip.clip = true;
  group = twoToo.makeGroup(titleTop);
  group.mask = clip;

  twoToo.update();
  if(runPrompt != null){clearInterval(runPrompt);}
  runPrompt = setInterval(telePrompt,10);
}
// bannerCommunicator();

function telePrompt(){
  x = titleTop.translation.x;
  y = titleTop.translation.y;
  if(x< -getTexWidth(titleTop.value, titleTop.size + 'px' + ' Karla')){
    titleTop.translation.set(vfsw,y);
  }else{titleTop.translation.set(x-1,y);}
  twoToo.update();
}

function getTexWidth(txt, font) {
  this.element = document.createElement('canvas');
  this.context = this.element.getContext("2d");
  this.context.font = font;
  return this.context.measureText(txt).width;
}

// bannerCommunicator('Welcome to Area OS!');
