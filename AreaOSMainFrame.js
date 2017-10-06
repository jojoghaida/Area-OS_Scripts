//* Copyright (c) 2016 - 2018 joeghaida / http://joeghaida.com

//app UI
resetButton = document.getElementById('resetButton');
resetText = document.getElementById('resetText');
function refreshPage(){
  resetText.style.color = "blue";
  resetButton.style.borderWidth = "1px";
  setTimeout(function(){location.reload();},500);
}
resetButton.addEventListener('click',refreshPage);
aboutButton = document.getElementById('aboutButton');
aboutText = document.getElementById('aboutText');
function launchAbout(){
  aboutText.style.color = "blue";
  aboutButton.style.borderWidth = "1px";
  setTimeout(function(){window.location.href = 'https://www.joeghaida.com/design/areaos-about';},500);

}
aboutButton.addEventListener('click',launchAbout);


//SCENE AND CONTROLS////////////////////////////////////////////////////////////
var camera, scene, controls, renderer;
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
scene.background = new THREE.Color(0xffffff ); //0x0851a4

// camera = new THREE.PerspectiveCamera( 55, w/h, 0.1, 10000 );
camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -5000, 5000 );
renderer = new THREE.WebGLRenderer({antialias:true});
viewport.addEventListener('mousemove',enableOrbitCam);
viewport.addEventListener('touchstart',enableOrbitCam);
renderer.setSize(w, h);
renderer.setPixelRatio( window.devicePixelRatio );
viewport.appendChild(renderer.domElement);
camera.position.y = 100;
camera.lookAt(new THREE.Vector3(0,0,0));
window.addEventListener( 'resize', onWindowResize, false );
// window.addEventListener("orientationchange", onWindowRotate);
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
// function onWindowRotate() {
//   function rotateView(){
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     render();
//   }
//   setTimeout(rotateView, 300);
// }
function render(){
renderer.render(scene,camera);
}
function viewAnim(){
requestAnimationFrame(viewAnim);
controls.update();
}
//SCENE AND CONTROLS////////////////////////////////////////////////////////////
//CAMERA FUNCTIONS//////////////////////////////////////////////////////////////
function returnCamPlan(){
  // if(camera.position.y <350){
  //   camera.position.y = camera.position.y++;
  //   requestAnimationFrame(viewAnim);
  // }
camera.position.y = 350;
camera.position.x = 0;
camera.position.z = 0;
camera.lookAt(new THREE.Vector3(0,0,0));
disableOrbitCam();
}

var resetCamButton = document.getElementById("resetCamButton");
resetCamButton.addEventListener('click', returnCamPlan);

function orbitCam(){
controls = new THREE.OrbitControls( camera,renderer.domElement );
controls.enableZoom = true;
controls.enableKeys = false;
controls.maxPolarAngle = Math.PI/2;
controls.addEventListener( 'change', render );
}

//orbit activation/deactivation
var camControls = document.getElementById('controlsviewportoverlay');
camControls.addEventListener('mousemove',lockOrbitMaintainControls);//disableOrbitCam(0));

// var questionDialog = document.getElementById('questionDialog');
// questionDialog.addEventListener('mousemove',disableOrbitCam);
// questionDialog.addEventListener('touchstart',disableOrbitCam);

var topInput = document.getElementById('topInput');
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
      // controls.pan.set(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
    },
    endDeepPress: function(){
      banner.style.color = "blue";
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
  var zoomSpeedVariable = 4;
  var zoomFactor = 0;
  var zoomingInterval = null;
  var zMinusEffet = document.getElementById('ZminusEffect');
  var zPlusEffect = document.getElementById('ZplusEffect');

  function zoom(value,amplitude){
    if(value != 0){
      amplitude = amplitude*-1;
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





//RHIZOME POPULATER//////////////////////////////////////////////////////////////
// Raycaster
function mouseCasting(){
mouseRay = new THREE.Raycaster();
mouse = new THREE.Vector2();
// areaoscanvas.addEventListener( 'mousemove', onMouseMove, false );

// rayIconGeo = new THREE.Geometry();
// rayIconGeo.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,10,0))
// rayIcon = new THREE.Line(rayIconGeo,new THREE.LineBasicMaterial({color: "red"}));
// scene.add(rayIcon);
function onMouseMove(event){
  mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
  mouseRay.setFromCamera(mouse,camera);
  // rayCatch = mouseRay.intersectObjects(groupShapes.children);
  if ( rayCatch.length > 0 ) {
    // console.log(rayCatch[0].object.geometry.vertices[0]);
    // rayIcon.position.set( 0, 0, 0 );
    // rayIcon.lookAt( rayCatch[ 0 ].object.geometry.faces[0].normal);
    // rayIcon.position.copy(new THREE.Vector3(0,0,0));
  }
  renderer.render(scene,camera);
}
}
// mouseCasting();

// //MovingRay
// function movingRay(){
//   //
//   rayIconGeo = new THREE.Geometry();
//   rayIconGeo.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,1000,0))
//   rayIcon = new THREE.Line(rayIconGeo,new THREE.LineBasicMaterial({color: "red"}));
//   scene.add(rayIcon);
//   //
//   scannerRay = new THREE.Raycaster();
//   rayPt = new THREE.Vector3(0,-10,-1);
//   function runRay(){
//     rayPt.z ++;
//     rayDirect = rayPt.clone();
//     rayDirect.y = 250;
//     scannerRay.set(rayPt,rayDirect);
//     scan = scannerRay.intersectObjects(groupShapes.children);
//     rayIcon.position.set(rayPt.x,rayPt.y+10,rayPt.z);
//     renderer.render(scene,camera);
//   }
//   setInterval(runRay,1000);
// }
// movingRay();

// SQstuff
function leaseIgnition(areaRequest){
}
var occupy = true;
var onHold = []; // store annex here

function checkSQ(meshToCheckSQ,requestedSQ){
var faceListSize = meshToCheckSQ.faces.length
var areaSQ = 0.00
for (i = 0; i < faceListSize; i++){
var va = meshToCheckSQ.vertices[meshToCheckSQ.faces[i].a];
var vb = meshToCheckSQ.vertices[meshToCheckSQ.faces[i].b];
var vc = meshToCheckSQ.vertices[meshToCheckSQ.faces[i].c];
var ab = vb.clone().sub(va);
var ac = vc.clone().sub(va);
var cross = new THREE.Vector3();
cross.crossVectors( ab, ac );
areaSQ += cross.length() / 2;
}
if(areaSQ<requestedSQ){
}else{
  var li = 0;
  occupy = false;
}
}
// SQstuff

// function spaceNavigator(){ //!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //variables
  var mainAxis = new THREE.Vector3();
  var mainAxisCrv = new THREE.Line();
  var baseCrvOffsetVec = new THREE.Vector3();

  //functions
    //baseCrv
  function twoPtCurve(vec1,vec2,_group = null,_style){
    geometry = new THREE.Geometry();
    linestyle = new THREE.LineBasicMaterial({color: 0x7ce7c9, linewidth: 1.3});
    geometry.vertices.push(vec1,vec2);
    lineObject = new THREE.Line(geometry,linestyle);
    scene.add(lineObject);
    renderer.render(scene,camera);
    if(_group) {_group.add(lineObject);}

    return(lineObject);
  }
  //
  function getCrvVector(crv){
    direction = new THREE.Vector3();
    direction.subVectors(crv.geometry.vertices[1],crv.geometry.vertices[0]).normalize();
    cleanVector(direction);
    return(direction);
  }
  //
  function reverseUnitVector(unitV){
    angle = Math.PI;
    unitV.applyAxisAngle(unitV,angle);
    cleanVector(unitV);
    return(unitV);
  }
  //
  function twoPtUnitVec(pt1,pt2){
    unitVector = new THREE.Vector3();
    unitVector.subVectors(pt1,pt2).normalize();
    return(unitVector);
  }
  //
  function extendCrv(crv,distance,direction){ //fix distance and direction
    newExtedPt = new THREE.Vector3(0,0,0);
    a = crv.geometry.vertices[1].clone();
    b = direction.clone();
    b = b.setLength(distance);
    combine = a.add(b); // not so accurate <<<<<<
    newExtedPt.set(combine.x,combine.y,combine.z);
    newExtedPt = cleanVector(newExtedPt);
    crv.geometry.vertices[1].copy(newExtedPt);
    crv.geometry.verticesNeedUpdate = true;
    crv.geometry.computeBoundingSphere();
    //!!!!!!!!!!!
    // camera.position.set(newExtedPt.toArray());
    // controls.target.set(newExtedPt.toArray());
    // camera.position.y = 45;
    // controls.update();
    //!!!!!!!!!!!
    renderer.render(scene,camera);
    return(crv);
  }
  //
    //baseCrv
    //zonCrv
  function getOffsetDirection(base){//eventually will become more intelligent and produce several possible vectors
    zoneCrvVec = new THREE.Vector3();
    zoneCrvVec.subVectors(base.geometry.vertices[1],base.geometry.vertices[0]).normalize();
    var axis = new THREE.Vector3( 0, 1, 0 );
    var angle = Math.PI / 2;
    zoneCrvVec.applyAxisAngle(axis,angle);
    cleanVector(zoneCrvVec);
    return(zoneCrvVec);
  }
  //
  function getCrvLength(crv){
    v1 = crv.geometry.vertices[0];
    v2 = crv.geometry.vertices[1];
    function distanceVector( v1, v2 ){
        var dx = v1.x - v2.x;
        var dy = v1.y - v2.y;
        var dz = v1.z - v2.z;
        return Math.sqrt( dx * dx + dy * dy + dz * dz );
    }
    crvLength = distanceVector(v1,v2);
    return(crvLength);
  }
  //
  function pushPointDirection(point,direction){
    direction.normalize();
    pushedPoint = new THREE.Vector3();
    pushedPoint.addVectors(point,direction);
    cleanVector(pushedPoint);
    return(pushedPoint);

    //You compute the direction vector by subtracting one line segment endpoint from the other, and then normalizing.
  }

  function cleanVector(v){
    x = v.x.toFixed(2); y = v.y.toFixed(2); z = v.z.toFixed(2);
    v.set(Number(x),Number(y),Number(z));
    return(v);
  }
  //
    //zonCrv
    ///anots
    function dropCircle(point,radius = 1,_group,_style){
      var geometry = new THREE.CircleGeometry( radius, 32 );
      var material = new THREE.MeshBasicMaterial( { color: 0x26D8A5/*0x7ce7c9*/ } );
      var circle = new THREE.Mesh( geometry, material );
      circle.position.copy(point);
      circle.rotation.x = -Math.PI/2
      scene.add( circle );
      renderer.render(scene,camera);
      }

    function dropTriangle(a,b,c){
      var geometry = new THREE.Geometry();
      // a = new THREE.Vector3(30,0,30);
      // b = new THREE.Vector3(30,0,0);
      // c = new THREE.Vector3(0,0,0);
      geometry.vertices.push(c);
      geometry.vertices.push(b);
      geometry.vertices.push(a);

      geometry.faces.push(new THREE.Face3(2,1,0));
      geometry.computeFaceNormals();
      var material = new THREE.MeshBasicMaterial({color: 0x26D8A5});
      var triangle = new THREE.Mesh(geometry, material);
      scene.add(triangle);
      renderer.render(scene,camera);
      return(triangle);
    }

    ///anots

    //furnitureFunctions
  function dropChairs(point,direction){
    newChair = new THREE.Mesh();
    newChair = chairMesh.clone();
    chairFacing = new THREE.Vector3(1,0,0);
    newChair.rotation.y = chairFacing.angleTo(direction)*-1;
    newChair.position.copy(point);
    scene.add(newChair);
    renderer.render(scene,camera);
    return(newChair);
  }
    //furnitureFunctions

    // test2
  newP1 = new THREE.Vector3(-30,0,-50);
  // newP2 = new THREE.Vector3(47,0,7);
  newP2 = new THREE.Vector3(31,0,-39);
  newMainAxisCrv = twoPtCurve(newP1, pushPointDirection(newP1,twoPtUnitVec(newP2,newP1)));
  dropCircle(newP1);

  // trivial variables for live preview
  var stPt = new THREE.Vector3(-40,0,35); // init for populator
  dropCircle(stPt); // style init position
  var mainTrajectory = new THREE.Vector3(1,0,0); //
  var endPt = pushPointDirection(stPt,mainTrajectory);

  var inputMainCrv = twoPtCurve(stPt,endPt);
  var inputMainCrvGrowthInterval = .5;
  var editMainCrv = null;

  var on2nd = false;
  var secondaryConCrvs = [];
  var secondaryConCrvsGrothInterval = .5;
  var editSecCrv = null;

  var furnitureGroup = [];
  var anmot_tri_G = [];
  var annot_txt_G = [];
  // trivial variables for live preview \\

  var logDrawF = true;
  var drawBool = false;

  function drawElements(){ /*design to be looped live*/ //if(logDrawF==true){console.log("drawElements() is running. Request is =",selectorText.value);};

    drawBool = true;

    if(selectorText.value>furnitureGroup.length){ /*addition*/
      drawBool = true;
      if(on2nd==false){ /*first addition*/
        extendCrv(inputMainCrv,inputMainCrvGrowthInterval,getCrvVector(inputMainCrv)); if(logDrawF==true){console.log("main curve extension. new distance =",getCrvLength(inputMainCrv));};
        if(Number(getCrvLength(inputMainCrv).toFixed(2))/4 /*<<<spacing tempo*/ % 1 == 0){ if(logDrawF==true){console.log("producing new trajectory curve.");};
          //test
          on2nd = true;
          a = inputMainCrv.geometry.vertices[1].clone();
          bD = getOffsetDirection(inputMainCrv);
          b = pushPointDirection(a,bD,secondaryConCrvsGrothInterval);
          inputSecondaryCrv = twoPtCurve(a,b);
          // secondaryConCrvs.push(inputSecondaryCrv);
          triangle = dropTriangle(a.clone(),pushPointDirection(a,getCrvVector(inputMainCrv)),b.clone());
          anmot_tri_G.push(triangle);
          // furnitureGroup.add(dropChairs(inputMainCrv.geometry.vertices[1],getCrvVector(inputMainCrv))); if(logDrawF==true){console.log(furnitureGroup.children.length,"chairs");}
          renderer.render(scene,camera);
          //test
        }
      }/*first addition end*/else{//second curve addition
        extendCrv(inputSecondaryCrv,secondaryConCrvsGrothInterval,getCrvVector(inputSecondaryCrv));// may have to change set up here so that max length is checked before extending curve
        if(Number(getCrvLength(inputSecondaryCrv).toFixed(2))/2 /*<<<spacing tempo*/ % 1 == 0){
          furnitureGroup.push(dropChairs(inputSecondaryCrv.geometry.vertices[1],getCrvVector(inputMainCrv)));
        }
        if(Number(getCrvLength(inputSecondaryCrv).toFixed(2)) >= 15){
          on2nd = false;
          secondaryConCrvs.push(inputSecondaryCrv);
          annot_txt_G.push(dropText(secondaryConCrvs.length,pushPointDirection(inputSecondaryCrv.geometry.vertices[1].clone(),getCrvVector(inputSecondaryCrv)),fontKarla_Reg));
        }
      }//second curve addition end*\
      if(selectorText.value>furnitureGroup.length){setTimeout(drawElements,.1)}/*REBOOT~~*/
    }//addition end*\

    if(selectorText.value<furnitureGroup.length){ /*reduction*/ if(logDrawF==true){console.log("Reduction");};
      drawBool = true;
      if(on2nd==false){ //curve1 reduction
        extendCrv(inputMainCrv,-inputMainCrvGrowthInterval,getCrvVector(inputMainCrv)); if(logDrawF==true){console.log("main curve reduction. new distance =",getCrvLength(inputMainCrv));};
        if(Number(getCrvLength(inputMainCrv).toFixed(2))/4 /*<<<spacing tempo*/ % 1 == 0){ if(logDrawF==true){console.log("reducing new trajectory curve.");};
          on2nd = true;
          inputSecondaryCrv = secondaryConCrvs.pop(); if(logDrawF==true){console.log("secondaryConCrvs.length =",secondaryConCrvs.length);};
        }
        // if(selectorText.value<furnitureGroup.children.length){setTimeout(drawElements,.1)}//REBOOT~~
      }/*curve2 reduction end*/else{//second curve reduction
        extendCrv(inputSecondaryCrv,-secondaryConCrvsGrothInterval,getCrvVector(inputSecondaryCrv));
        if(Number(getCrvLength(inputSecondaryCrv).toFixed(2))/2 /*<<<spacing tempo*/ % 1 == 0){
          removal = furnitureGroup.pop();
          scene.remove(removal);
          renderer.render(scene,camera);
        }
        if(Number(getCrvLength(inputSecondaryCrv).toFixed(2)) <= secondaryConCrvsGrothInterval){ if(logDrawF==true){console.log("removing trajectory curve");};
          scene.remove(inputSecondaryCrv);
          scene.remove(anmot_tri_G.pop());
          scene.remove(annot_txt_G.pop());
          renderer.render(scene,camera);
          on2nd = false;
        }
      }//second curve reduction end*\
      if(selectorText.value<furnitureGroup.length){setTimeout(drawElements,.1)}/*REBOOT~~*/
    }//reduction end*\

    if(selectorText.value == furnitureGroup.length){ //stop; switch bool off
      drawBool = false;
    }

  }//drawElements end*\

  function cahceElements(){ /*installs elements on load*/

  }



  // function clearMyIntervals(){
  //   //clear any existing intervals
  //   if(editMainCrv != null){
  //     clearInterval(editMainCrv);
  //     editMainCrv = null;
  //   }
  //   if(editSecCrv != null){
  //     clearInterval(editSecCrv);
  //     editSecCrv = null;
  //   }
  // }
  // function livePreview(furnitureElement,furnishRequest){
  //   clearMyIntervals();
  //   if(furnishRequest > furnitureGroup.children.length){
  //     editMainCrv = setInterval(function(){
  //       // extendCrv(inputMainCrv,inputMainCrvGrowthInterval/*<fix*/,getCrvVector(inputMainCrv));
  //       console.log(getCrvLength(inputMainCrv).toFixed(2));
  //       if(Number(getCrvLength(inputMainCrv).toFixed(2))/4 /*<<<spacing tempo*/ % 1 == 0){
  //         if(on2nd == false){
  //           console.log("little crv drop");
  //           /////
  //           clearInterval(editMainCrv);
  //           a = inputMainCrv.geometry.vertices[1].clone();
  //           bD = getOffsetDirection(inputMainCrv);
  //           b = pushPointDirection(a,bD,secondaryConCrvsGrothInterval);
  //           inputSecondaryCrv = twoPtCurve(a,b);
  //           dropTriangle(a.clone(),pushPointDirection(a,getCrvVector(inputMainCrv)),b.clone());
  //           on2nd = true;//set bool to secondary crv
  //           /////
  //         }
  //         editSecCrv = setInterval(function(){
  //           if(furnishRequest > furnitureGroup.children.length){
  //             if(Number(getCrvLength(inputSecondaryCrv).toFixed(2))<15){
  //               extendCrv(inputSecondaryCrv, inputMainCrvGrowthInterval, getCrvVector(inputSecondaryCrv));
  //               if(Number(getCrvLength(inputSecondaryCrv).toFixed(2))/2 % 1 == 0){
  //                 furnitureGroup.add(dropChairs(inputSecondaryCrv.geometry.vertices[1],getCrvVector(inputMainCrv)));
  //               }
  //             }else{
  //               on2nd = false;
  //               extendCrv(inputMainCrv,inputMainCrvGrowthInterval/*<fix*/,getCrvVector(inputMainCrv));
  //               livePreview(null,selectorText.value);
  //             }
  //           }else{clearMyIntervals()}
  //         },1);
  //       }else{
  //         extendCrv(inputMainCrv,inputMainCrvGrowthInterval/*<fix*/,getCrvVector(inputMainCrv));
  //       }
  //     },1);
  //     if(secondaryConCrvs.children.length == 0){
  //       // extendCrv(inputMainCrv,inputMainCrvGrowthInterval,getCrvVector(inputMainCrv));
  //     }
  //   }
  //   if(furnishRequest < furnitureGroup.children.length){
  //     // editMainCrv = setInterval(function(){extendCrv(inputMainCrv,furnishRequest/*<fix*/,getCrvVector(inputMainCrv))},1);
  //   }
  // }



  function newStepExt(crv,distance,increment = 0.5){
    extLength = 1;
    function loopExt(){
      realCrvLength = getCrvLength(crv);
      extLength+= increment;
      if(realCrvLength >= distance){console.log("done!");}else{
        extendCrv(crv,increment,getCrvVector(crv));
        crv.geometry.computeBoundingSphere();
        if(extLength/4 % 1 == 0){
          p1 = crv.geometry.vertices[1].clone();
          p2 = pushPointDirection(p1,getOffsetDirection(crv));
          secondaryCrv = twoPtCurve(p1,p2.multiplyScalar(1));
          dropTriangle(p1.clone(),pushPointDirection(p1,getCrvVector(crv)),p2.clone());
          function inceptiveCrv(crv2,distance,increment2 = 1,passDistance){
            realCrvLength2 = getCrvLength(crv2)
            extLength2+=increment2 ;
            if(realCrvLength2>=distance){
              // callback
              newStepExt(crv,passDistance,.5)
            }else{
            extendCrv(crv2,increment2,getCrvVector(crv2));
            if(extLength2/2 % 1 == 0){
              c = dropChairs(crv2.geometry.vertices[1],getCrvVector(crv));
              c.material.color.set("red");
            }
            setTimeout(function(){inceptiveCrv(crv2,distance,increment2,passDistance)},1);
            }
          }
          var extLength2 = 0; // tracks the extension ammount while looping
          inceptiveCrv(secondaryCrv,15,1,distance);
        }else{setTimeout(loopExt,1);}
      }
    }
    loopExt();
  }
  // window.onload(newStepExt(newMainAxisCrv,80)); //!!!!!!!!

  setTimeout(function(){newStepExt(newMainAxisCrv,80)},2000);
// test2
// }
// test 1
function dropPoints(coord,color = "red"){
  geometry = new THREE.Geometry();
  geometry.vertices.push(coord);
  material = new THREE.PointsMaterial({color: color});
  point = new THREE.Points(geometry, material);
  // points.size(.5);
  scene.add(point);
  renderer.render(scene,camera);
  return(point);
}
// a = dropPoints(new THREE.Vector3(-20,0,-10));
// b = dropPoints(new THREE.Vector3(-20,0,0));
// c = dropPoints(new THREE.Vector3(-10,0,0));
// d = dropPoints(new THREE.Vector3(-10,0,-10));
// e = dropPoints(new THREE.Vector3(-5,0,-5),"blue");
// f = dropPoints(new THREE.Vector3(-15,0,-5),"green");
//
// checkPts = [a,b,c,d];


function dropText(text,pos,font = fontKarla_Reg,just=0,size=1){
  var geometry = new THREE.TextGeometry( text, {font: font, size: size, height: 0, curveSegments: 30, bevelEnabled: false, bevelThickness: 10, bevelSize: 8, bevelSegments: 5});
  var material = new THREE.MeshBasicMaterial({color: "black"});
  var text = new THREE.Mesh(geometry, material);
  textObject = new THREE.Object3D();
  textObject.add(text);
  scene.add(textObject);
  // textObject.center();
  // textObject.position.x = pos[0];
  // textObject.position.y = pos[1];
  // textObject.position.z = pos[2];
  textObject.position.set(pos.x,pos.y,pos.z);

  textObject.rotation.x = -Math.PI/2;
  renderer.render(scene,camera);
  return(textObject);

}
// dropText();

// setTimeout(function () {
//   dropText("test!",[-20,0,-20],fontKarla_Reg);
// }, 2000);


// spaceNavigator(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function fieldVectorizer(){

}
//RHIZOME POPULATER//////////////////////////////////////////////////////////////
