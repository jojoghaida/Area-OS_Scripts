//VisualFeedback

//temp remove old header
function removeOldHeader(){
  document.getElementById('');
}
removeOldHeader();

//setting canvas*
var inputsTwoScene = document.getElementById('feedbackCanvas');
var vfsw = inputsTwoScene.offsetWidth
var vfsh = inputsTwoScene.offsetHeight
var params = {width: vfsw, height: vfsh};
var two = new Two(params).appendTo(inputsTwoScene);

//mouse gestures*
inputsTwoScene.addEventListener('mousemove',disableOrbitCam);
