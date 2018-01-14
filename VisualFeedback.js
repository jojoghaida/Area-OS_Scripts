//VisualFeedback

//setting canvas*
var feedbackTwoScene = document.getElementById('areaoshead');
var vfsw = feedbackTwoScene.offsetWidth
var vfsh = feedbackTwoScene.offsetHeight
var paramsToo = {width: vfsw, height: vfsh};
var twoToo = new Two(params).appendTo(feedbackTwoScene);

//mouse gestures*
feedbackTwoScene.addEventListener('mousemove',disableOrbitCam);

var titleTop = twoToo.makeText('AREA OS',vfsw/2,vfsh/2+10); //get glyph size to get y-value
titleTop.fill = aOS_ColorStyles.aOS_OSblue;
titleTop.size = 24;
titleTop.family = 'Karla';
titleTop.alignment = 'center';

var titleLeft = twoToo.makeText('Reset',20,vfsh/2+10); //get glyph size to get y-value
titleLeft.fill = aOS_ColorStyles.aOS_OSblue;
titleLeft.size = 14;
titleLeft.family = 'Karla';
titleLeft.alignment = 'left';

var titleRight = twoToo.makeText('About',vfsw-20,vfsh/2+10); //get glyph size to get y-value
titleRight.fill = aOS_ColorStyles.aOS_OSblue;
titleRight.size = 14;
titleRight.family = 'Karla';
titleRight.alignment = 'right';

twoToo.update();
