//VisualFeedback

//setting canvas*
var feedbackTwoScene = document.getElementById('areaoshead');
var vfsw = feedbackTwoScene.offsetWidth
var vfsh = feedbackTwoScene.offsetHeight
var paramsToo = {width: vfsw, height: vfsh};
var twoToo = new Two(params).appendTo(feedbackTwoScene);

//mouse gestures*
feedbackTwoScene.addEventListener('mousemove',disableOrbitCam);

var titleTop = twoToo.makeText('AREA OS',vfsw/2,vfsh/2); //get glyph size to get y-value
titleTop.fill = colorStyle;
titleTop.size = 24;
titleTop.family = 'Karla';
titleTop.alignment = 'center';

twoToo.update();
