//Area OS Interface Commands

//Creates and sets scene. Manages buttons and interactions.
//app UI
resetButton = document.getElementById('resetButton');
resetText = document.getElementById('resetText');
function refreshPage(){
  resetText.style.color = "#0851a4";
  resetButton.style.borderWidth = "1px";
  setTimeout(function(){location.reload();},500);
}
resetButton.addEventListener('click',refreshPage);
aboutButton = document.getElementById('aboutButton');
aboutText = document.getElementById('aboutText');
function launchAbout(){
  aboutText.style.color = "#0851a4";
  aboutButton.style.borderWidth = "1px";
  setTimeout(function(){window.location.href = 'https://www.joeghaida.com/design/areaos-about';},500);

}
aboutButton.addEventListener('click',launchAbout);


//SCENE AND CONTROLS////////////////////////////////////////////////////////////
var camera, scene, controls, renderer;
var controllerOveride = 0;
var frustumSize = 350;

viewInit();
orbitCam();
viewAnim();
function viewInit(){
viewport = document.getElementById('areaoscanvas');
h = viewport.offsetHeight;
w = viewport.offsetWidth;

var aspect = window.innerWidth / window.innerHeight;

scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); //0x0851a4

camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -5000, 5000 );

renderer = new THREE.WebGLRenderer({antialias:true, alpha: true, autoClear: false,});

viewport.addEventListener('mousemove',enableOrbitCam);
viewport.addEventListener('touchstart',enableOrbitCam);
renderer.setSize(w, h);
renderer.setPixelRatio( window.devicePixelRatio );
// renderer.shadowMap.enabled; // shadows!
// renderer.shadowMap.type = THREE.BasicShadowMap; // shadows!
renderer.shadowMap.renderReverseSided; // shadows!
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // shadows!
viewport.appendChild(renderer.domElement);
camera.position.y = 350;
camera.position.x = 0;
camera.position.z = 0;

scene.add(camera); //!!!!!<<<<<<<<<<<<<<<<<<<<<<<<<<

camera.lookAt(new THREE.Vector3(0,0,0));
window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener("orientationchange", onWindowRotate);
}


function onWindowResize() {
  aspect = window.innerWidth / window.innerHeight;
	camera.left   = - frustumSize * aspect / 2;
	camera.right  =   frustumSize * aspect / 2;
	camera.top    =   frustumSize / 2;
	camera.bottom = - frustumSize / 2;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene,camera);
}

function onWindowRotate() {
  function rotateView(){
    aspect = window.innerWidth / window.innerHeight;
  	camera.left   = - frustumSize * aspect / 2;
  	camera.right  =   frustumSize * aspect / 2;
  	camera.top    =   frustumSize / 2;
  	camera.bottom = - frustumSize / 2;
  	camera.updateProjectionMatrix();
  	renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene,camera);
  }
  setTimeout(rotateView, 100);
}


function viewAnim(){
  requestAnimationFrame(viewAnim);
  controls.update();
}

controls.noZoom = true;
//SCENE AND CONTROLS////////////////////////////////////////////////////////////
//CAMERA FUNCTIONS//////////////////////////////////////////////////////////////

function frustumMouse( event ) {
  var amplitude = null;
  if(event.deltaY>0){
    amplitude = 25;
  }else{
    amplitude = -25;
  }
  frustumSize += amplitude
  if(frustumSize<25){frustumSize = 25;}
  if(frustumSize>400){frustumSize = 400;}
  aspect = window.innerWidth / window.innerHeight;
  camera.left   = - frustumSize * aspect / 2;
  camera.right  =   frustumSize * aspect / 2;
  camera.top    =   frustumSize / 2;
  camera.bottom = - frustumSize / 2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene,camera);

}
viewport.addEventListener( 'mousewheel', frustumMouse, false );


function returnCamAxon(){
  camera.position.y = 200;
  camera.position.x = -200;
  camera.position.z = -200;
  controls.target.set(0,0,0);
}
function returnCamPlan(mC=[0,350,0],tC=[0,0,0]){
  disableOrbitCam();
  steps = 10;
  currentPos = [camera.position.x, camera.position.y, camera.position.z];
  currentTarget = controls.target;
  cameraPosIncrements = [(currentPos[0] - 0)/-10, (currentPos[1] - 350)/10, (currentPos[2] - 0)/-10];
  cameraTarIncrements = [(currentTarget.x - tC[0]/-steps), (currentTarget.y - tC[1]/-steps), (currentTarget.z - tC[2]/-steps)];

  function dollyCam(){
    console.log("dolly");
    if(camera.position.x != 0 && camera.position.y != 350 && camera.position.z != 0){
      console.log("posityion");
      console.log(camera.position);
      camera.position.x += cameraPosIncrements[0];
      camera.position.y += cameraPosIncrements[1];
      camera.position.z += cameraPosIncrements[2];
      setTimeout(dollyCam,1);
    }
    if(controls.target.x != tC[0] && controls.target.y != tC[1] && controls.target.z != tC[2]){
      console.log("controls");
      controls.target.x += cameraTarIncrements[0];
      controls.target.y += cameraTarIncrements[1];
      controls.target.z += cameraTarIncrements[2];
      setTimeout(dollyCam,1);
    }
    renderer.render(scene,camera);
  }
  // dollyCam();
  camera.position.y = 350;
  camera.position.x = 0;
  camera.position.z = 0;
  controls.target.set(0,0,0);
}

var resetCamButton = document.getElementById("resetCamButton");
resetCamButton.addEventListener('click', returnCamPlan);

function orbitCam(){
  controls = new THREE.OrbitControls( camera, viewport );
  controls.enableZoom = true;
  controls.enableKeys = false;
  controls.maxPolarAngle = Math.PI/2;
}

//orbit activation/deactivation
var camControls = document.getElementById('controlsviewportoverlay');
camControls.addEventListener('mousemove',lockOrbitMaintainControls);//disableOrbitCam(0));

// var questionDialog = document.getElementById('questionDialog');
// questionDialog.addEventListener('mousemove',disableOrbitCam);
// questionDialog.addEventListener('touchstart',disableOrbitCam);

var topInput = document.getElementById('areaoshead');
topInput.addEventListener('mousemove',disableOrbitCam);
topInput.addEventListener('touchstart',disableOrbitCam);
//orbit activation/deactivation

function lockOrbitMaintainControls(){
disableOrbitCam(0);
}
function disableOrbitCam(controlsToggle){
controls.enabled = false
function hideCamIcons(){
  var camIcons = document.getElementsByClassName('cameraicons');
  for (i = 0; i < camIcons.length; i++){
    camIcons[i].style.transition = "opacity 1s";
    camIcons[i].style.opacity = 0;
  }
  function offCamIcons(){
    for (i = 0; i < camIcons.length; i++){
      if (camIcons[i].style.opacity == 0){
        camIcons[i].style.visibility = 'hidden';
        camControls.style.visibility = 'hidden';
      }
    }
  }
  setTimeout(offCamIcons, 1000);
}
if(controlsToggle != 0){
  hideCamIcons();
}
}
function enableOrbitCam(){
  controls.enabled = true
  //document.getElementById('camautobutton').click();
  function showCamIcons(){
    var camIcons = document.getElementsByClassName('cameraicons');
    for (i = 0; i < camIcons.length; i++){
      camIcons[i].style.visibility = 'visible';
      camControls.style.visibility = 'visible';
    }
    for (i = 0; i < camIcons.length; i++){
      camIcons[i].style.transition = "opacity 1s";
      camIcons[i].style.opacity = 1;
    }
}
showCamIcons();
}
window.onload = disableOrbitCam;
//stage camera
function swingCamAxon(){
  requestAnimationFrame(swingCamAxon);
  camera.rotation.x += 1.01;
  camera.rotation.z += 1.01;
  renderer.render(scene, camera);
}
//CAMERA FUNCTIONS//////////////////////////////////////////////////////////////

//PRESSURE FUNCTIONS//////////////////////////////////////////////////////////////

bottomInput = document.getElementById('inputCanvas');
pressureInput = function(){
  Pressure.set(bottomInput, {
    start: function(event){
    },
    end: function(){
    },
    startDeepPress: function(event){
      if(headerMode!=1){
        menuHeaderBasic();
      }
      expandInput();
      removeInputListeners();
      Pressure.remove();
    },
    endDeepPress: function(){
      // banner.style.color = "blue";
    },
    change: function(force, event){
    },
    unsupported: function(){
      // NOTE: this is only called if the polyfill option is disabled!
      // this is called once there is a touch on the element and the device or browser does not support Force or 3D touch
    }
  });
}
pressureInput();

panCanvas = document.getElementById('areaoscanvas')
banner = document.getElementById('titleText');//test
panningMode = function(){
  Pressure.set(panCanvas, {
    start: function(event){
    },
    end: function(){
    },
    startDeepPress: function(event){
      banner.style.color = "red";
      // camera.position.x = 20; ///////////////////!!!!!!
      // controls.pan.set(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
      // controls.noRotate = true;
      // controls.pan.set(event.clientX, event.clientY);
      controllerOveride = 2;
    },
    endDeepPress: function(){
      banner.style.color = "blue";
      // controls.noRotate = false;

    },
    change: function(force, event){
    },
    unsupported: function(){
      // NOTE: this is only called if the polyfill option is disabled!
      // this is called once there is a touch on the element and the device or browser does not support Force or 3D touch
    }
  });
}
panningMode();

zoomButtons = function(){
  var zoomSpeedVariable = 6;
  var zoomFactor = 0;
  var zoomingInterval = null;
  var zMinusEffet = document.getElementById('ZminusEffect');
  var zPlusEffect = document.getElementById('ZplusEffect');

  function zoom(value,amplitude){
    if(value != 0){
      amplitude = amplitude*-1;
      if(frustumSize<=25){
        clearInterval(zoomingInterval);
        pressureButtonZplus.style.background = null;
        zPlusEffect.style.visibility = 'hidden';
        return}
    }else{if(frustumSize>=550){
      clearInterval(zoomingInterval);
      pressureButtonZminus.style.background = null;
      zMinusEffet.style.visibility = 'hidden';
      return}
    }
    aspect = window.innerWidth / window.innerHeight;
    frustumSize += amplitude
  	camera.left   = - frustumSize * aspect / 2;
  	camera.right  =   frustumSize * aspect / 2;
  	camera.top    =   frustumSize / 2;
  	camera.bottom = - frustumSize / 2;
  	camera.updateProjectionMatrix();
  	renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene,camera);
  }

  var pressureButtonZplus = document.getElementById('zoomInButton');
  Pressure.set(pressureButtonZplus, {
    start: function(event){
      pressureButtonZplus.style.background = "red";
      zPlusEffect.style.visibility = 'visible';
      zoomingInterval = setInterval(function(){zoom(1,zoomFactor);},10);
    },
    end: function(){
      pressureButtonZplus.style.background = null;
      zPlusEffect.style.visibility = 'hidden';
      clearInterval(zoomingInterval);
    },
    startDeepPress: function(event){
      clearInterval(zoomingInterval);
      zoomingInterval = setInterval(function(){zoom(1,zoomFactor);},10);
      pressureButtonZplus.style.background = "red";
      zPlusEffect.style.visibility = 'visible';
    },
    endDeepPress: function(){
      clearInterval(zoomingInterval);
      pressureButtonZplus.style.background = null;
      zPlusEffect.style.visibility = 'hidden';

    },
    change: function(force, event){
      zoomFactor = force*zoomSpeedVariable
      if(force>.10){
        zPlusEffect.style.visibility = 'visible';
        zPlusEffect.style.width = force*100 + "%";
      }else {
        zPlusEffect.style.visibility = 'hidden';
      }
    },
    unsupported: function(){
      // NOTE: this is only called if the polyfill option is disabled!
      // this is called once there is a touch on the element and the device or browser does not support Force or 3D touch
    }
  });
  var pressureButtonZminus = document.getElementById('zoomOutButton');
  Pressure.set(pressureButtonZminus, {
    start: function(event){
      pressureButtonZminus.style.background = "red";
      zMinusEffet.style.visibility = 'visible';
      zoomingInterval = setInterval(function(){zoom(0,zoomFactor);},10);
    },
    end: function(){
      pressureButtonZminus.style.background = null;
      zMinusEffet.style.visibility = 'hidden';
      clearInterval(zoomingInterval);
    },
    startDeepPress: function(event){
      clearInterval(zoomingInterval);
      zoomingInterval = setInterval(function(){zoom(0,zoomFactor);},10);
      pressureButtonZminus.style.background = "red";
      zMinusEffet.style.visibility = 'visible';
    },
    endDeepPress: function(){
      clearInterval(zoomingInterval);
      pressureButtonZminus.style.background = null;
      zMinusEffet.style.visibility = 'hidden';
    },
    change: function(force, event){
      zoomFactor = force*zoomSpeedVariable
      if(force>.10){
        zMinusEffet.style.visibility = 'visible';
        zMinusEffet.style.width = force*100 + "%";
        // zMinusEffet.style;
      }else {
        zMinusEffet.style.visibility = 'hidden';
      }

    },
    unsupported: function(){
      // NOTE: this is only called if the polyfill option is disabled!
      // this is called once there is a touch on the element and the device or browser does not support Force or 3D touch
    }
  });
  }
zoomButtons();

//PRESSURE FUNCTIONS//////////////////////////////////////////////////////////////

function mouseCasting(){
  console.log("ray live");
  mouseRay = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  viewport.addEventListener( 'click', onMouseMove, false );
  // rayIconGeo = new THREE.Geometry();
  // rayIconGeo.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,10,0))
  // rayIcon = new THREE.Line(rayIconGeo,new THREE.LineBasicMaterial({color: "red"}));
  // scene.add(rayIcon);
  function onMouseMove(event){
    mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    mouseRay.setFromCamera(mouse,camera);
    rayInter = mouseRay.intersectObjects(clickables.children,true);
    rayCatch = null;
    if ( rayInter.length > 0 ) {
      rayCatch = rayInter[0];
    }else{
      rayCatch = rayInter;
    }


    if(rayCatch.object.parent.userData.elementType == "FurnitureSet"){
      thisSelection = rayCatch.object.parent;
      console.log("1");
    }else {
      console.log(rayCatch.object.parent.parent);
      thisSelection = rayCatch.object.parent.parent;
      console.log("2");
    }
    if(thisSelection.userData.status == "occupied"){return}
    // paintObjects(thisSelection,userSelectionMaterials);
    for(i=0;i<thisSelection.children.length;i++){
      if(thisSelection.children[i].children.length != 0){
        console.log("child has children");
        for(z=0;z<thisSelection.children[i].children.length;z++){
          paintObjects(thisSelection.children[i].children[z],userSelectionMaterials);
        }
      }else{paintObjects(thisSelection.children[i],userSelectionMaterials);}
    }
    renderer.render(scene,camera);
  }
}
setTimeout(mouseCasting,3000);

function clickScope(){
  //
}

function paintObjects(paintChild,style){
  if(paintChild.type == "LineSegments"){
    paintChild.material = style.line;
  }else{
    paintChild.material = style.mesh;
  }
}

var userSelection = new THREE.Group();

var selBool = 1;
var selFadeBool = 1;

function liveSelector(){
  current = userSelectionMaterials.mesh.opacity;
  if(selFadeBool==0){
    userSelectionMaterials.mesh.opacity = Number((userSelectionMaterials.mesh.opacity+.01).toFixed(2));
    if(userSelectionMaterials.mesh.opacity == 1){selFadeBool = 1}
  }else{
    userSelectionMaterials.mesh.opacity = Number((userSelectionMaterials.mesh.opacity-.01).toFixed(2));
    if(userSelectionMaterials.mesh.opacity == .5){selFadeBool = 0}
  }
  renderer.render(scene,camera);
  if(selBool == 1){
    var runLiveSelector = setTimeout(liveSelector,.1);
  }else{
    clearInterval(runLiveSelector);
    selFadeBool = 1;
  }
}
liveSelector(1);
