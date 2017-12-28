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
