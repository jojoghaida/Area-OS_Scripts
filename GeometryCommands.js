//Area OS Geometry Commands
//Houses all "mini" commands. To be called within major functions.

//Curve Functions

function twoPtCurve(vec1,vec2,_group = null,_style = aOS_LineStyles.thin.aOS_LightGreen){
  geometry = new THREE.Geometry();
  geometry.vertices.push(vec1,vec2);
  lineObject = new THREE.Line(geometry,_style);
  scene.add(lineObject);
  renderer.render(scene,camera);
  if(_group) {_group.add(lineObject);}

  return(lineObject);
}

function getCrvVector(crv){
  direction = new THREE.Vector3();
  direction.subVectors(crv.geometry.vertices[1],crv.geometry.vertices[0]).normalize();
  cleanVector(direction);
  return(direction);
}

function reverseUnitVector(unitV){
  angle = Math.PI;
  unitV.applyAxisAngle(unitV,angle);
  cleanVector(unitV);
  return(unitV);
}

function twoPtUnitVec(pt1,pt2){
  unitVector = new THREE.Vector3();
  unitVector.subVectors(pt1,pt2).normalize();
  return(unitVector);
}

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

function getOffsetDirection(base){//eventually will become more intelligent and produce several possible vectors
  zoneCrvVec = new THREE.Vector3();
  zoneCrvVec.subVectors(base.geometry.vertices[1],base.geometry.vertices[0]).normalize();
  var axis = new THREE.Vector3( 0, 1, 0 );
  var angle = Math.PI / 2;
  zoneCrvVec.applyAxisAngle(axis,angle);
  cleanVector(zoneCrvVec);
  return(zoneCrvVec);
}

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

//Matrix Functions

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

//Item Functions

///Furnitures
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

function dropWhiteCollar(){
  
}
///Annotations

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
