//* Copyright (c) 2016 - 2018 joeghaida / http://joeghaida.com






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

  //functions
    //baseCrv

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
  function pushPointDirection(point, direction, amplitude = null){
    direction.normalize();
    if(amplitude != null){
      direction.setLength(amplitude);
    }
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


    //furnitureFunctions

    // test2
  // newP1 = new THREE.Vector3(-30,0,-50);
  // newP2 = new THREE.Vector3(31,0,-39);
  // newMainAxisCrv = twoPtCurve(newP1, pushPointDirection(newP1,twoPtUnitVec(newP2,newP1)));
  // dropCircle(newP1);

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

  var cursorBool = 0;


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
          b = pushPointDirection(a,bD);
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

          // dropPtLight2(inputSecondaryCrv.geometry.vertices[1].clone()); //dicks

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


  function liveCursor(point,boundingBox,colors){
    currentCursor = scene.getObjectByName("cursor");

    if(cursorBool == 1){
      setTimeout(liveCursor,500);
    }
  }




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


function dropText(text,pos,font = fontKarla_Reg,just=0,size=1){
  var geometry = new THREE.TextGeometry( text, {font: font, size: size, height: 0, curveSegments: 30, bevelEnabled: false, bevelThickness: 10, bevelSize: 8, bevelSegments: 5});
  var material = new THREE.MeshBasicMaterial({color: "white"});
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


function dropPtLight(point, color = 0x26D8A5){
  light1 = new THREE.PointLight(color, .7, 10000);
  lightLocation = point.geometry.vertices[0].clone();
  lightLocation.y = 1;
  light1.position.set(lightLocation.x,lightLocation.y,lightLocation.z);
  scene.add(light1);
}

function dropPtLight2(point){
  light1 = new THREE.PointLight(0x0092ff, .2, 10000);
  lightLocation = point;
  lightLocation.y = .25;
  light1.position.set(lightLocation.x,lightLocation.y,lightLocation.z);
  // light1.castShadow = true; // shadows!
  // light1.shadow.mapSize.width = 500000;  // default
  // light1.shadow.mapSize.height = 500000; // default
  // light1.shadow.camera.near = 0.5;       // default
  // light1.shadow.camera.far = 50000;
  // light1.shadowDarkness = .5; // shadows!
  // light1.shadowCameraVisible = true; // shadows!
  // light1.camera;
  // var helper = new THREE.CameraHelper( light1.shadow.camera ); // shadows!
  // scene.add( helper ); // shadows!
  scene.add(light1);
}



function divideCrv(crv,divisions = 10){

  pointList = [];
  direction = getCrvVector(crv);
  distance = getCrvLength(crv);
  for(i=0; i < divisions; i++){
    point = crv.geometry.vertices[0].clone();
    if(i==0){check = point.clone()}else{
      check = pushPointDirection(point.clone(),direction,(distance/divisions)*i);
    }
    pointList.push(new THREE.Vector3());
    pointList[i].set(check.x,check.y,check.z);
    dropPoints(pointList[i]);
  }
  for(i=0; i < pointList.length; i++){
    move = pushPointDirection(pointList[i],getOffsetDirection(crv));
    // dropPtLight2(move);
  }
  return(pointList);

}

function extrudeStraightLine( crv, depth=10 ) {
  var geometry = new THREE.Geometry();
  var vertices = crv.geometry.vertices;

  for (i = 0; i < vertices.length; i++) {
    a = vertices[i].clone();
    geometry.vertices.push(a);
    b = a.clone();
    b.y = depth;
    geometry.vertices.push(b);
    geometry.faces.push(new THREE.Face3(i, i+1, i+2));
  }
  geometry.verticesNeedUpdate;
  geometry.computeFaceNormals;
  material = new THREE.MeshLambertMaterial({color: "red", emissive: "red", side: THREE.DoubleSide});
  mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true; // shadows!
  // mesh.position.z = -2; // shadows!
  // mesh.position.y = -.1; // shadows!

  scene.add(mesh);
  return geometry;
}


function fieldVectorizer(){

  ptColor = new THREE.PointsMaterial({color: "white" /*, specular: "white",shininess: 0*/});
  a = scene.getObjectByName("0,1");
  b = scene.getObjectByName("3,8");
  c = scene.getObjectByName("6,9");

  a.material = ptColor;
  b.material = ptColor;
  c.material = ptColor;

  dropCircle(a.geometry.vertices[0]);
  dropCircle(b.geometry.vertices[0]);
  dropCircle(c.geometry.vertices[0]);

  dropPtLight(a);
  dropPtLight(b);
  dropPtLight(c);

  renderer.render(scene,camera);

  crv = twoPtCurve(a.geometry.vertices[0],b.geometry.vertices[0]);
  crv = twoPtCurve(b.geometry.vertices[0],c.geometry.vertices[0]);
}

function translator(pt){

  pointCoordinates = [];
  store = null;

  for(i = 0; i < pt.name.length; i++){
    alphabet = pt.name[i];
    if(i == 0){
      store = alphabet;
    }else if (alphabet != ",") {

      if(store != null){
        store += alphabet;
      }else{
        store = alphabet;
      }
    }
    if(alphabet == ","){
      pointCoordinates.push(store);
      store = null;
    }
    if(i == pt.name.length - 1){
      pointCoordinates.push(store);
      store = null;
    }
  }
  return(pointCoordinates);
}

function findRandomnAdjacentMatrix(pointCoordinates){

  vacantPts = scene.getObjectByName("vacantPts");

  a = Number(pointCoordinates[0]);
  b = Number(pointCoordinates[1]);

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }
  for(i=0;i<8;i++){
    // console.log("scan matrix",i);
    nA = getRandomInt(a - 1, a + 2);
    nB = getRandomInt(b - 1, b + 2);
    point = vacantPts.getObjectByName(nA+","+nB);
    // console.log(point);

    if(point != undefined){
      return(point);
      break
    }

    if(i == 8){
      return(undefined);
      break
    }
  }
  // return()
}

///////////////////////////////////////////////////////////////////////
function getAvailableMatrixNeighbors(pointCoordinates){//!need to update to be aware of self intersections!

  adjacentPts = [];
  vacantPts = scene.getObjectByName("vacantPts");
  row = Number(pointCoordinates[0]);
  col = Number(pointCoordinates[1]);
  console.log(pointCoordinates);
  y = [row-1,row,row+1]; //adjacent rows
  x = [col-1,col,col+1]; //adjacent columns
  console.log(y,x);
  for(l = 0; l < y.length; l ++){
    for(b = 0; b < x.length; b++){
      pushBool = 0;
      if(y[l] != row){pushBool++}
      if(x[b] != col){pushBool++}
      if(pushBool != 0){adjacentPts.push([y[l],x[b]]);}
    }
  }
  console.log(adjacentPts);
  adjacentPts = [adjacentPts[1],adjacentPts[2],adjacentPts[4],adjacentPts[7],adjacentPts[6],adjacentPts[5],adjacentPts[3],adjacentPts[0]];

  availableAdjacents = [];
  vacantPts = scene.getObjectByName("vacantPts");
  for(u = 0; u < adjacentPts.length; u++){
    find = vacantPts.getObjectByName(adjacentPts[u][0]+","+adjacentPts[u][1])
    if(find != undefined){
      console.log(find);
      availableAdjacents.push(find);
    }else{availableAdjacents.push(null);}
  }
  //fix diagonals
  // if(availableAdjacents[0]==null){availableAdjacents[7] =null; availableAdjacents[1] = null;}
  // if(availableAdjacents[2]==null){availableAdjacents[1] =null; availableAdjacents[3] = null;}
  // if(availableAdjacents[4]==null){availableAdjacents[3] =null; availableAdjacents[5] = null;}
  // if(availableAdjacents[6]==null){availableAdjacents[5] =null; availableAdjacents[7] = null;}
  //fix diagonals\\
  return(availableAdjacents);
}

function newCrawler(pt, steps = 220, init_Dir = 0){
  dropPtLight(pt,0x26D8A5);
  dropCircle(pt.geometry.vertices[0]);
  pastPt = pt;
  vacantPts = scene.getObjectByName("vacantPts");
  occupiedPts = scene.getObjectByName("occupiedPts");
  stepNum = 0;

  crvSegments = [];
  crvOcPts = [];
  vecHist = [];

  var matrixDirection = init_Dir;//<<<fix
  function animateCrawl(){
    if(stepNum < steps){
      stepNum++
      crvVert1 = pastPt.geometry.vertices[0].clone();
      ptCoord = translator(pastPt);
      availableMatrixNeighbors = getAvailableMatrixNeighbors(ptCoord);
      matrixDirection2 = [matrixDirection-2,matrixDirection-1,matrixDirection+1,matrixDirection+2];
      if(matrixDirection2[0]==-2){matrixDirection2[1]=6}
      if(matrixDirection2[1]==-1){matrixDirection2[1]=7}
      if(matrixDirection2[2]==8){matrixDirection2[2]=0}
      if(matrixDirection2[3]==9){matrixDirection2[2]=1}
      console.log(matrixDirection2);
      if(availableMatrixNeighbors[matrixDirection] != null){
        newPt = availableMatrixNeighbors[matrixDirection];

      }else{
        for(i = 0; i < matrixDirection2.length; i++){
          newPt = availableMatrixNeighbors[matrixDirection2[i]];
          if(newPt != null){
            matrixDirection = matrixDirection2[i]
            break
          }
        }
      }
      // newPt = findRandomnAdjacentMatrix(ptCoord);
      // console.log("newPt = ",newPt);
      if(newPt!= undefined){
        crvVert2 = newPt.geometry.vertices[0].clone();
        if(stepNum == 1){
          crvSegments.push(twoPtCurve(crvVert1.clone(),crvVert2.clone(),null,new THREE.LineBasicMaterial({color: 0x26D8A5})));
          vecHist.push(matrixDirection);
          console.log(vecHist);

        }else{
          // dropPtLight(pastPt);

          if(matrixDirection != vecHist[vecHist.length-1]){
            console.log("HEY");
            vecHist.push(matrixDirection);//now make new crv!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            crvSegments.push(twoPtCurve(crvVert1.clone(),crvVert2.clone(),null,new THREE.LineBasicMaterial({color: 0x26D8A5})));
            dropPtLight(pastPt);

          }
          crvSegments[crvSegments.length-1].geometry.vertices[1].copy(crvVert2);
          crvSegments[crvSegments.length-1].geometry.verticesNeedUpdate = true;
          crvSegments[crvSegments.length-1].geometry.computeBoundingSphere();
          renderer.render(scene,camera);
        }
        pastPt.material = aOS_PointStyles.aOS_LightGreen;
        occupiedPts.add(pastPt);
        vacantPts.remove(pastPt);
        pastPt = newPt;
        console.log(getCrvLength(crvSegments[crvSegments.length-1]).toFixed(2));
        if(getCrvLength(crvSegments[crvSegments.length-1]).toFixed(2)/2 % 1 == 0){
          console.log("!!!!");
        }

        // camera.position.x = Number(pastPt.geometry.vertices[0].x);
        // camera.position.y = 350;
        // camera.position.z = Number(pastPt.geometry.vertices[0].z);

        // controls.target.set(pastPt);
        // console.log(camera.position);
        // dropPtLight(newPt);

        // console.log(document.querySelector('canvas').toDataURL()); //output frames

        setTimeout(animateCrawl,100);
      }else{
        dropPtLight(pastPt,"red");
        renderer.render(scene,camera);
        stepNum = steps;
      }
      if(newPt != undefined && stepNum == steps){
        dropPtLight(newPt,"red");
        renderer.render(scene,camera);
      }
    }
  }
  animateCrawl();
}

  setTimeout(
    function (){
      newCrawler(scene.getObjectByName("18,0"),450,0);
    },1000);
