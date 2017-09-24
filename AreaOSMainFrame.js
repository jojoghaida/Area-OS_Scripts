//app UI
resetButton = document.getElementById('resetButton');
function refreshPage(){
  alert("refresh");
}
resetButton.addEventListener('click',refreshPage);
aboutButton = document.getElementById('aboutButton');
function launchAbout(){
  alert("about");
}
aboutButton.addEventListener('click',launchAbout);

//SCENE AND CONTROLS////////////////////////////////////////////////////////////
var camera, scene, controls, renderer;
viewInit();
orbitCam();
viewAnim();
function viewInit(){

viewport = document.getElementById('areaoscanvas');
h = viewport.offsetHeight;
w = viewport.offsetWidth;

scene = new THREE.Scene();
scene.background = new THREE.Color( 0xffffff );

camera = new THREE.PerspectiveCamera( 55, w/h, 0.1, 10000 );
//camera = new THREE.OrthographicCamera( w/2,w/-2,h/-2,h/2,1,500 );
renderer = new THREE.WebGLRenderer({antialias:true});
viewport.addEventListener('mousemove',enableOrbitCam);
viewport.addEventListener('touchstart',enableOrbitCam);
renderer.setSize(w, h);
renderer.setPixelRatio( window.devicePixelRatio );
viewport.appendChild(renderer.domElement);
camera.position.y = 400;
camera.lookAt(new THREE.Vector3(0,0,0));
window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener("orientationchange", onWindowRotate);
}
function onWindowResize() {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );
render();
}
function onWindowRotate() {
  function rotateView(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
  }
  setTimeout(rotateView, 100);
}
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
// console.log(camera.position.y);
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

var questionDialog = document.getElementById('questionDialog');
questionDialog.addEventListener('mousemove',disableOrbitCam);
questionDialog.addEventListener('touchstart',disableOrbitCam);

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
  camPosition = camera.position;
  camDirection = camera.getWorldDirection();
  console.log("!!!!!!",camDirection);
  newPosition = new THREE.Vector3();
  console.log(camPosition);
  if(value != 0){
    amplitude = amplitude*-1;
  }
  newPosition.addVectors(camPosition,camDirection.multiplyScalar(amplitude));
  camera.position.copy(newPosition);
  }

  var pressureButtonZplus = document.getElementById('zoomInButton');
  Pressure.set(pressureButtonZplus, {
    start: function(event){
      console.log(pressureButtonZplus.value);
      pressureButtonZplus.style.background = "red";
      zPlusEffect.style.visibility = 'visible';
      zoomingInterval = setInterval(function(){zoom(0,zoomFactor);},10);
    },
    end: function(){
      pressureButtonZplus.style.background = null;
      zPlusEffect.style.visibility = 'hidden';
      clearInterval(zoomingInterval);
    },
    startDeepPress: function(event){
      clearInterval(zoomingInterval);
      zoomingInterval = setInterval(function(){zoom(0,zoomFactor);},10);
      pressureButtonZplus.style.background = "red";
      zPlusEffect.style.visibility = 'visible';
    },
    endDeepPress: function(){
      console.log("forceEnd!")
      clearInterval(zoomingInterval);
      pressureButtonZplus.style.background = null;
      zPlusEffect.style.visibility = 'hidden';

    },
    change: function(force, event){
      console.log(force);
      zoomFactor = force*zoomSpeedVariable
      if(force>.10){
        zPlusEffect.style.visibility = 'visible';
        console.log(zMinusEffet);
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
      console.log(pressureButtonZminus.value);
      pressureButtonZminus.style.background = "red";
      zMinusEffet.style.visibility = 'visible';
      zoomingInterval = setInterval(function(){zoom(1,zoomFactor);},10);
    },
    end: function(){
      pressureButtonZminus.style.background = null;
      zMinusEffet.style.visibility = 'hidden';
      clearInterval(zoomingInterval);
    },
    startDeepPress: function(event){
      clearInterval(zoomingInterval);
      zoomingInterval = setInterval(function(){zoom(1,zoomFactor);},10);
      pressureButtonZminus.style.background = "red";
      zMinusEffet.style.visibility = 'visible';
    },
    endDeepPress: function(){
      console.log("forceEnd!")
      clearInterval(zoomingInterval);
      pressureButtonZminus.style.background = null;
      zMinusEffet.style.visibility = 'hidden';
    },
    change: function(force, event){
      console.log(force);
      zoomFactor = force*zoomSpeedVariable
      if(force>.10){
        zMinusEffet.style.visibility = 'visible';
        console.log(zMinusEffet);
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
areaoscanvas.addEventListener( 'mousemove', onMouseMove, false );

// rayIconGeo = new THREE.Geometry();
// rayIconGeo.vertices.push(new THREE.Vector3(0,0,0),new THREE.Vector3(0,10,0))
// rayIcon = new THREE.Line(rayIconGeo,new THREE.LineBasicMaterial({color: "red"}));
// scene.add(rayIcon);
function onMouseMove(event){
  mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
  mouseRay.setFromCamera(mouse,camera);
  rayCatch = mouseRay.intersectObjects(groupShapes.children);
  if ( rayCatch.length > 0 ) {
    // console.log(rayCatch[0].object.geometry.vertices[0]);
    // rayIcon.position.set( 0, 0, 0 );
    // rayIcon.lookAt( rayCatch[ 0 ].object.geometry.faces[0].normal);
    // rayIcon.position.copy(new THREE.Vector3(0,0,0));
  }
  renderer.render(scene,camera);
}
}
mouseCasting();

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

function spaceNavigator(){

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
    if(_group) {_group.add(lineObject);}

    return(lineObject);
  }
  //
  function getCrvVector(crv){
    direction = new THREE.Vector3();
    direction.subVectors(crv.geometry.vertices[1],crv.geometry.vertices[0]).normalize();
    return(direction);
  }
  //
  function twoPtUnitVec(pt1,pt2){
    unitVector = new THREE.Vector3();
    unitVector.subVectors(pt1,pt2).normalize();
    return(unitVector);
  }
  //
  function extendCrv(crv,distance,direction){
    newExtedPt = new THREE.Vector3();
    newExtedPt.addVectors(crv.geometry.vertices[1],direction/*.multiplyScalar(distance)*/);
    crv.geometry.vertices[1].copy(newExtedPt);
    crv.geometry.verticesNeedUpdate = true;
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
    return(pushedPoint);

    //You compute the direction vector by subtracting one line segment endpoint from the other, and then normalizing.
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
    }

    ///anots

    //furnitureFunctions
  function dropChairs(point,direction){
    newChair = new THREE.Mesh();
    newChair = chairMesh.clone();
    chairFacing = new THREE.Vector3(1,0,0);
    newChair.rotation.y = chairFacing.angleTo(direction)*-1;
    newChair.position.copy(point);
    scene.add(newChair.clone());
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

  function newStepExt(crv,distance,increment = 0.5){
    extLength = 1;
    function loopExt(){
      realCrvLength = getCrvLength(crv);
      extLength+= increment;
      if(realCrvLength >= distance){console.log("done!");}else{
        // console.log("extending curve",increment,"feet.");
        extendCrv(crv,increment,getCrvVector(crv));
        crv.geometry.computeBoundingSphere()
        if(extLength/4 % 1 == 0){
          // console.log(extLength);
          p1 = crv.geometry.vertices[1].clone();
          p2 = pushPointDirection(p1,getOffsetDirection(crv));
          secondaryCrv = twoPtCurve(p1,p2.multiplyScalar(1));
          dropTriangle(p1.clone(),pushPointDirection(p1,getCrvVector(crv)),p2.clone());
          function inceptiveCrv(crv2,distance,increment2 = 1,passDistance){
            realCrvLength2 = getCrvLength(crv2)
            extLength2+=increment2 ;
            // console.log(extLength2);
            if(realCrvLength2>=distance){
              // callback
              newStepExt(crv,passDistance,.5)
            }else{
            extendCrv(crv2,increment2,getCrvVector(crv2));
            if(extLength2/2 % 1 == 0){
              dropChairs(crv2.geometry.vertices[1],getCrvVector(crv));
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
}
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
a = dropPoints(new THREE.Vector3(-20,0,-10));
b = dropPoints(new THREE.Vector3(-20,0,0));
c = dropPoints(new THREE.Vector3(-10,0,0));
d = dropPoints(new THREE.Vector3(-10,0,-10));
e = dropPoints(new THREE.Vector3(-5,0,-5),"blue");
f = dropPoints(new THREE.Vector3(-15,0,-5),"green");

checkPts = [a,b,c,d];


function dropText(text,pos,font){
  var geometry = new THREE.TextGeometry( text, {font: font, size: 5, height: 0, curveSegments: 30, bevelEnabled: false, bevelThickness: 10, bevelSize: 8, bevelSegments: 5});
  var material = new THREE.MeshBasicMaterial({color: 0x26D8A5});
  var text = new THREE.Mesh(geometry, material);
  textobject = new THREE.Object3D();
  textobject.add(text);
  scene.add(textobject);
  textobject.position.x = pos[0];
  textobject.position.y = pos[1];
  textobject.position.z = pos[2];

  textobject.rotation.x = -Math.PI/2;
  renderer.render(scene,camera);

}
// dropText();

//////

//////
setTimeout(function () {
  dropText("test!",[-20,0,-20],fontKarla_Reg);
}, 2000);


spaceNavigator();
function fieldVectorizer(){

}
//RHIZOME POPULATER//////////////////////////////////////////////////////////////
