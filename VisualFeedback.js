//VisualFeedback

//setting canvas*
var feedbackTwoScene = document.getElementById('areaoshead');
var vfsw = feedbackTwoScene.offsetWidth
var vfsh = feedbackTwoScene.offsetHeight
var params = {width: vfsw, height: vfsh};
var two = new Two(params).appendTo(feedbackTwoScene);

//mouse gestures*
feedbackTwoScene.addEventListener('mousemove',disableOrbitCam);
