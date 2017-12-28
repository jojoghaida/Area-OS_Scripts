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


//Matrix Functions

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

///Annotations
