//MESH LIBRARY//////////////////////////////////////////////////////////////
// fonts
fontKarla_Reg = undefined;
function loadKarla(){
  var loader = new THREE.FontLoader();
  				loader.load("https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/5dd63395077414af139378bb31fb7f05cc471884/Karla_Regular.json", function ( response ) {
  					fontKarla_Reg = response;} );
}
loadKarla();
// fonts
//swingCamAxon();
//stage camera//
//chair & chair functions
var myChairLoader = new THREE.JSONLoader();
var chairMesh = null;
var chairGeo = null;
myChairLoader.load(
  'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/basicChair.json',
  function (geometry, materials) {
    chairGeo = geometry;
    var material = new THREE.MeshBasicMaterial( { color: 0x0092ff } );
    chairMesh = new THREE.Mesh(geometry,material);
    scene.add(chairMesh);
    renderer.render(scene,camera);
  }
);

var animate = function (){
requestAnimationFrame(animate);
if(chairMesh !== null){
  chairMesh.rotation.y += 0.01;
}
renderer.render(scene,camera);
};

var alsoChair = null;
var copyChair = function(){
  if(chairMesh !== null){
    alsoChair = chairMesh.clone();
    alsoChair.rotation.y = 1
    scene.add(alsoChair);
    moveChair(alsoChair);
  }
}

function moveChair(chairToMove){
  chairToMove.position.z = 4;
}
//chair & chair functions//
//conference table
var conferenceTableLoader = new THREE.JSONLoader();
var conferenceTable4_6 = null;
conferenceTableLoader.load(
'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/basicConferenceTable4to6.json',
function (geometry, materials) {
  var material = new THREE.MeshBasicMaterial( { color: 0xc26bff } );
  conferenceTable4_6 = new THREE.Mesh(geometry,material);
  conferenceTable4_6.position.x = 3;
  scene.add(conferenceTable4_6);
  renderer.render(scene,camera);
}
);
//conference table//
//site..
// var siteLoader = new THREE.JSONLoader();
// var siteMesh = null;
// var siteGeo = null;
// siteLoader.load(
//   'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/siteOutline.json',
//  function ( geometry, materials ) {
//    siteGeo = geometry;
//    var siteMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 , wireframe: true, transparent: true} );
//    siteMesh = new THREE.Mesh(geometry,siteMaterial);
//    scene.add(siteMesh);
//    renderer.render(scene,camera);
//    //highlightEdges(siteGeo);
//  }
// );
// function highlightEdges(outlineThis){
//   var eGeometry = new THREE.EdgesGeometry(outlineThis);
//   var eMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
//   var edges = new THREE.LineSegments(eGeometry,eMaterial);
//   scene.add(edges);
//   renderer.render(scene, camera);
// }
//siteColumns
var siteColumnsLoader = new THREE.JSONLoader();
var siteColumnsMesh = null;
var siteColumnsGeo = null;
siteColumnsLoader.load(
'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/siteColumns.json',
function ( geometry, materials ) {
 siteColumnsGeo = geometry;
 var siteColumnsMaterial = new THREE.MeshBasicMaterial( { color: "white", wireframe: false, transparent: true} );
 siteColumnsMesh = new THREE.Mesh(geometry,siteColumnsMaterial);
 // siteColumnsMesh.castShadow = true;
 scene.add(siteColumnsMesh);
 renderer.render(scene,camera);
 lowerFloors(siteColumnsMesh);
}
);
//siteSlab
var siteSlabLoader = new THREE.JSONLoader();
var siteSlabMesh = null;
var siteSlabGeo = null;
siteSlabLoader.load(
  'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/4933405f4866468cc224e06b5d0d3ce796da7dbe/slab.json',
  function(geometry, materials){
      siteSlabGeo = geometry;
      var siteSlabMaterial = new THREE.MeshBasicMaterial( { color: "white", wireframe: false, transparent: true, side: THREE.DoubleSide} );
      siteSlabMesh = new THREE.Mesh(geometry, siteSlabMaterial);
      scene.add(siteSlabMesh);
      renderer.render(scene,camera);
      lowerFloors(siteSlabMesh);
  }
);

var siteSlabPhongLoader = new THREE.JSONLoader();
var siteSlabPhongMesh = null;
var siteSlabPhongGeo = null;
siteSlabPhongLoader.load(
  'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/eb383d3afb11d6184d1b9ea9f45a62c2b9a27e04/slabPhong.json',
  function(geometry, materials){
      siteSlabPhongGeo = geometry;
      var siteSlabPhongMaterial = new THREE.MeshPhongMaterial({color: "white", shininess: 0, reflectivity: 0});
      siteSlabPhongMesh = new THREE.Mesh(geometry, siteSlabPhongMaterial);
      ///
      siteSlabPhongMesh.geometry.dynamic = true
      siteSlabPhongMesh.geometry.__dirtyVertices = true;
      siteSlabPhongMesh.geometry.__dirtyNormals = true;
      siteSlabPhongMesh.flipSided = true;
      for(var i = 0; i<siteSlabPhongMesh.geometry.faces.length; i++) {
          siteSlabPhongMesh.geometry.faces[i].normal.x = -1*siteSlabPhongMesh.geometry.faces[i].normal.x;
          siteSlabPhongMesh.geometry.faces[i].normal.y = -1*siteSlabPhongMesh.geometry.faces[i].normal.y;
          siteSlabPhongMesh.geometry.faces[i].normal.z = -1*siteSlabPhongMesh.geometry.faces[i].normal.z;
      }
      siteSlabPhongMesh.geometry.computeVertexNormals();
      siteSlabPhongMesh.geometry.computeFaceNormals();
      ///
      siteSlabPhongMesh.position.y = -.1;
      siteSlabPhongMesh.receiveShadow = true; // shadows!
      scene.add(siteSlabPhongMesh);
      renderer.render(scene,camera);
  }
);
//siteSlab
//siteEgress

var siteEgressLoader = new THREE.JSONLoader();
var siteEgressMesh = null;
var siteEgressGeo = null;
siteEgressLoader.load(
'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/70a73598111b4631a829e5fd735fb8c4d2867c0d/egress.json',
function ( geometry, materials ) {
 siteEgressGeo = geometry;
 var siteEgressMaterial = new THREE.MeshBasicMaterial( { color: 0xFFEB00, wireframe: false, transparent: true, opacity: 1, side: THREE.DoubleSide} );
 siteEgressMesh = new THREE.Mesh(geometry,siteEgressMaterial);
 scene.add(siteEgressMesh);
 var egressOutline = new THREE.Geometry();
 egressOutline.copy(siteEgressGeo);
 egressOutline.mergeVertices();
 highlightEdges(egressOutline);
 renderer.render(scene,camera);
}
);

//siteWalls
var siteWallsLoader = new THREE.JSONLoader();
var siteWallsMesh = null;
var siteWallsGeo = null;
siteWallsLoader.load(
'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/walls.json',
function ( geometry, materials ) {
 siteWallsGeo = geometry;
 var siteWallsMaterial = new THREE.MeshBasicMaterial( { color: 0xf2f2f2} );
 siteWallsMesh = new THREE.Mesh(geometry,siteWallsMaterial);
 scene.add(siteWallsMesh);
 renderer.render(scene,camera);
 lowerFloors(siteWallsMesh);

 var wallOutline = new THREE.Geometry();
 wallOutline.copy(siteWallsGeo);
 wallOutline.mergeVertices();
 lowerFloors(highlightEdges(wallOutline));
}
);
//siteSection
var siteSectionLoader = new THREE.JSONLoader();
var siteSectionMesh = null;
var siteSectionGeo = null;
siteSectionLoader.load(
'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/section.json',
function ( geometry, materials ) {
 siteSectionGeo = geometry;
 var siteSectionMaterial = new THREE.MeshBasicMaterial( { color: 0xf2f2f2, wireframe: false, transparent: true} );
 siteSectionMesh = new THREE.Mesh(geometry,siteSectionMaterial);
 scene.add(siteSectionMesh);
 renderer.render(scene,camera);
 highlightEdges(siteSectionGeo,.5);
}
);
//siteFacade
var siteSectionLoader = new THREE.JSONLoader();
var siteFacadeMesh = null;
var siteSectionGeo = null;
siteSectionLoader.load(
'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/facade.json',
function ( geometry, materials ) {
 siteSectionGeo = geometry;
 var siteSectionMaterial = new THREE.MeshBasicMaterial( { color: "black", wireframe: false, transparent: true} );
 siteFacadeMesh = new THREE.Mesh(geometry,siteSectionMaterial);
 scene.add(siteFacadeMesh);
 renderer.render(scene,camera);
 lowerFloors(siteFacadeMesh);
}
);
//site glazing
var siteGlazingLoader = new THREE.JSONLoader();
var siteGlazingMesh = null;
var siteGlazingGeo = null;
siteGlazingLoader.load(
'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/228311d405f510829733751fd4ef7bd704faafba/glass.json',
function ( geometry, materials ) {
 siteGlazingGeo = geometry;
 var siteGlazingMaterial = new THREE.MeshBasicMaterial( { color: 0x26D8A5, wireframe: false, transparent: true,  opacity:.1, side: THREE.DoubleSide} );//new THREE.MeshPhongMaterial( { color: 0x26D8A5, wireframe: false, transparent: true, opacity:.1, side: THREE.DoubleSide, reflectivity: 1, shininess: 150} );
 siteGlazingMesh = new THREE.Mesh(geometry,siteGlazingMaterial);
 scene.add(siteGlazingMesh);
 renderer.render(scene,camera);
 lowerFloors(siteGlazingMesh);
}
);
//siteOutline
// var siteOutlineLoader = new THREE.JSONLoader();
// var siteOutlineMesh = null;
// var siteOutlineGeo = null;
// siteOutlineLoader.load(
// 'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/siteOutline.json',
// function ( geometry, materials ) {
//  siteOutlineGeo = geometry;
//  highlightEdges(siteOutlineGeo);
// }
// );
function highlightEdges(outlineThis, lineW = .2){
var eGeometry = new THREE.EdgesGeometry(outlineThis);
var eMaterial = new THREE.LineBasicMaterial({ color: "black", linewidth: lineW });
var edges = new THREE.LineSegments(eGeometry,eMaterial);
scene.add(edges);
renderer.render(scene,camera);
return(edges);
}

function lowerFloors(mesh,arrayCount = 15, floorHeight = 15){
  material = mesh.material.clone();
  material.transparent = true;
  for(i=0;i<arrayCount;i++){
    a = mesh.clone();

    baseOpacity = a.material.opacity;
    a.position.y = (i+1)*-floorHeight;
    a.material = material.clone();
    a.material.opacity = baseOpacity - ((i + 1)/arrayCount)*baseOpacity;

    scene.add(a);
    renderer.render(scene,camera);
  }
}

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

var openPlanGridImport = [

  [
      new THREE.Vector3(-81.37,0.0,-65.18),
      new THREE.Vector3(-75.95,0.0,-65.18),
      new THREE.Vector3(-70.52,0.0,-65.18),
      new THREE.Vector3(-65.1,0.0,-65.18),
      new THREE.Vector3(-59.67,0.0,-65.18),
      new THREE.Vector3(-54.25,0.0,-65.18),
      new THREE.Vector3(-48.82,0.0,-65.18),
      new THREE.Vector3(-43.4,0.0,-65.18),
      new THREE.Vector3(-37.97,0.0,-65.18),
      new THREE.Vector3(-32.55,0.0,-65.18),
      new THREE.Vector3(-27.12,0.0,-65.18),
      new THREE.Vector3(-21.7,0.0,-65.18),
      new THREE.Vector3(-16.27,0.0,-65.18),
      new THREE.Vector3(-10.85,0.0,-65.18),
      new THREE.Vector3(-5.42,0.0,-65.18),
      new THREE.Vector3(0.0,0.0,-65.18),
      new THREE.Vector3(5.42,0.0,-65.18),
      new THREE.Vector3(10.85,0.0,-65.18),
      new THREE.Vector3(16.27,0.0,-65.18),
      new THREE.Vector3(21.7,0.0,-65.18),
      new THREE.Vector3(27.12,0.0,-65.18),
      new THREE.Vector3(32.55,0.0,-65.18),
      new THREE.Vector3(37.97,0.0,-65.18),
      new THREE.Vector3(43.4,0.0,-65.18),
      new THREE.Vector3(48.82,0.0,-65.18),
      new THREE.Vector3(54.25,0.0,-65.18),
      new THREE.Vector3(59.67,0.0,-65.18),
      new THREE.Vector3(65.1,0.0,-65.18),
      new THREE.Vector3(70.52,0.0,-65.18),
      new THREE.Vector3(75.95,0.0,-65.18),
      new THREE.Vector3(81.37,0.0,-65.18)],
  [
      new THREE.Vector3(-81.37,0.0,-59.69),
      new THREE.Vector3(-75.95,0.0,-59.69),
      new THREE.Vector3(-70.52,0.0,-59.69),
      new THREE.Vector3(-65.1,0.0,-59.69),
      new THREE.Vector3(-59.67,0.0,-59.69),
      new THREE.Vector3(-54.25,0.0,-59.69),
      new THREE.Vector3(-48.82,0.0,-59.69),
      new THREE.Vector3(-43.4,0.0,-59.69),
      new THREE.Vector3(-37.97,0.0,-59.69),
      new THREE.Vector3(-32.55,0.0,-59.69),
      new THREE.Vector3(-27.12,0.0,-59.69),
      new THREE.Vector3(-21.7,0.0,-59.69),
      new THREE.Vector3(-16.27,0.0,-59.69),
      new THREE.Vector3(-10.85,0.0,-59.69),
      new THREE.Vector3(-5.42,0.0,-59.69),
      new THREE.Vector3(0.0,0.0,-59.69),
      new THREE.Vector3(5.42,0.0,-59.69),
      new THREE.Vector3(10.85,0.0,-59.69),
      new THREE.Vector3(16.27,0.0,-59.69),
      new THREE.Vector3(21.7,0.0,-59.69),
      new THREE.Vector3(27.12,0.0,-59.69),
      new THREE.Vector3(32.55,0.0,-59.69),
      new THREE.Vector3(37.97,0.0,-59.69),
      new THREE.Vector3(43.4,0.0,-59.69),
      new THREE.Vector3(48.82,0.0,-59.69),
      new THREE.Vector3(54.25,0.0,-59.69),
      new THREE.Vector3(59.67,0.0,-59.69),
      new THREE.Vector3(65.1,0.0,-59.69),
      new THREE.Vector3(70.52,0.0,-59.69),
      new THREE.Vector3(75.95,0.0,-59.69),
      new THREE.Vector3(81.37,0.0,-59.69)],
  [
      new THREE.Vector3(-81.37,0.0,-54.2),
      new THREE.Vector3(-75.95,0.0,-54.2),
      new THREE.Vector3(-70.52,0.0,-54.2),
      new THREE.Vector3(-65.1,0.0,-54.2),
      new THREE.Vector3(-59.67,0.0,-54.2),
      new THREE.Vector3(-54.25,0.0,-54.2),
      new THREE.Vector3(-48.82,0.0,-54.2),
      new THREE.Vector3(-43.4,0.0,-54.2),
      new THREE.Vector3(-37.97,0.0,-54.2),
      new THREE.Vector3(-32.55,0.0,-54.2),
      new THREE.Vector3(-27.12,0.0,-54.2),
      new THREE.Vector3(-21.7,0.0,-54.2),
      new THREE.Vector3(-16.27,0.0,-54.2),
      new THREE.Vector3(-10.85,0.0,-54.2),
      new THREE.Vector3(-5.42,0.0,-54.2),
      new THREE.Vector3(0.0,0.0,-54.2),
      new THREE.Vector3(5.42,0.0,-54.2),
      new THREE.Vector3(10.85,0.0,-54.2),
      new THREE.Vector3(16.27,0.0,-54.2),
      new THREE.Vector3(21.7,0.0,-54.2),
      new THREE.Vector3(27.12,0.0,-54.2),
      new THREE.Vector3(32.55,0.0,-54.2),
      new THREE.Vector3(37.97,0.0,-54.2),
      new THREE.Vector3(43.4,0.0,-54.2),
      new THREE.Vector3(48.82,0.0,-54.2),
      new THREE.Vector3(54.25,0.0,-54.2),
      new THREE.Vector3(59.67,0.0,-54.2),
      new THREE.Vector3(65.1,0.0,-54.2),
      new THREE.Vector3(70.52,0.0,-54.2),
      new THREE.Vector3(75.95,0.0,-54.2),
      new THREE.Vector3(81.37,0.0,-54.2)],
  [
      new THREE.Vector3(-81.37,0.0,-48.71),
      new THREE.Vector3(-75.95,0.0,-48.71),
      new THREE.Vector3(-70.52,0.0,-48.71),
      new THREE.Vector3(-65.1,0.0,-48.71),
      new THREE.Vector3(-59.67,0.0,-48.71),
      new THREE.Vector3(-54.25,0.0,-48.71),
      new THREE.Vector3(-48.82,0.0,-48.71),
      new THREE.Vector3(-43.4,0.0,-48.71),
      new THREE.Vector3(-37.97,0.0,-48.71),
      new THREE.Vector3(-32.55,0.0,-48.71),
      new THREE.Vector3(-27.12,0.0,-48.71),
      new THREE.Vector3(-21.7,0.0,-48.71),
      new THREE.Vector3(-16.27,0.0,-48.71),
      new THREE.Vector3(-10.85,0.0,-48.71),
      new THREE.Vector3(-5.42,0.0,-48.71),
      new THREE.Vector3(0.0,0.0,-48.71),
      new THREE.Vector3(5.42,0.0,-48.71),
      new THREE.Vector3(10.85,0.0,-48.71),
      new THREE.Vector3(16.27,0.0,-48.71),
      new THREE.Vector3(21.7,0.0,-48.71),
      new THREE.Vector3(27.12,0.0,-48.71),
      new THREE.Vector3(32.55,0.0,-48.71),
      new THREE.Vector3(37.97,0.0,-48.71),
      new THREE.Vector3(43.4,0.0,-48.71),
      new THREE.Vector3(48.82,0.0,-48.71),
      new THREE.Vector3(54.25,0.0,-48.71),
      new THREE.Vector3(59.67,0.0,-48.71),
      new THREE.Vector3(65.1,0.0,-48.71),
      new THREE.Vector3(70.52,0.0,-48.71),
      new THREE.Vector3(75.95,0.0,-48.71),
      new THREE.Vector3(81.37,0.0,-48.71)],
  [
      new THREE.Vector3(-81.37,0.0,-43.22),
      new THREE.Vector3(-75.95,0.0,-43.22),
      new THREE.Vector3(-70.52,0.0,-43.22),
      new THREE.Vector3(-65.1,0.0,-43.22),
      new THREE.Vector3(-59.67,0.0,-43.22),
      new THREE.Vector3(-54.25,0.0,-43.22),
      new THREE.Vector3(-48.82,0.0,-43.22),
      new THREE.Vector3(-43.4,0.0,-43.22),
      new THREE.Vector3(-37.97,0.0,-43.22),
      new THREE.Vector3(-32.55,0.0,-43.22),
      new THREE.Vector3(-27.12,0.0,-43.22),
      new THREE.Vector3(-21.7,0.0,-43.22),
      new THREE.Vector3(-16.27,0.0,-43.22),
      new THREE.Vector3(-10.85,0.0,-43.22),
      new THREE.Vector3(-5.42,0.0,-43.22),
      new THREE.Vector3(0.0,0.0,-43.22),
      new THREE.Vector3(5.42,0.0,-43.22),
      new THREE.Vector3(10.85,0.0,-43.22),
      new THREE.Vector3(16.27,0.0,-43.22),
      new THREE.Vector3(21.7,0.0,-43.22),
      new THREE.Vector3(27.12,0.0,-43.22),
      new THREE.Vector3(32.55,0.0,-43.22),
      new THREE.Vector3(37.97,0.0,-43.22),
      new THREE.Vector3(43.4,0.0,-43.22),
      new THREE.Vector3(48.82,0.0,-43.22),
      new THREE.Vector3(54.25,0.0,-43.22),
      new THREE.Vector3(59.67,0.0,-43.22),
      new THREE.Vector3(65.1,0.0,-43.22),
      new THREE.Vector3(70.52,0.0,-43.22),
      new THREE.Vector3(75.95,0.0,-43.22),
      new THREE.Vector3(81.37,0.0,-43.22)],
  [
      new THREE.Vector3(-81.37,0.0,-37.73),
      new THREE.Vector3(-75.95,0.0,-37.73),
      new THREE.Vector3(-70.52,0.0,-37.73),
      new THREE.Vector3(-65.1,0.0,-37.73),
      new THREE.Vector3(-59.67,0.0,-37.73),
      new THREE.Vector3(-54.25,0.0,-37.73),
      new THREE.Vector3(-48.82,0.0,-37.73),
      new THREE.Vector3(-43.4,0.0,-37.73),
      new THREE.Vector3(-37.97,0.0,-37.73),
      new THREE.Vector3(-32.55,0.0,-37.73),
      new THREE.Vector3(-27.12,0.0,-37.73),
      new THREE.Vector3(-21.7,0.0,-37.73),
      new THREE.Vector3(-16.27,0.0,-37.73),
      new THREE.Vector3(-10.85,0.0,-37.73),
      new THREE.Vector3(-5.42,0.0,-37.73),
      new THREE.Vector3(0.0,0.0,-37.73),
      new THREE.Vector3(5.42,0.0,-37.73),
      new THREE.Vector3(10.85,0.0,-37.73),
      new THREE.Vector3(16.27,0.0,-37.73),
      new THREE.Vector3(21.7,0.0,-37.73),
      new THREE.Vector3(27.12,0.0,-37.73),
      new THREE.Vector3(32.55,0.0,-37.73),
      new THREE.Vector3(37.97,0.0,-37.73),
      new THREE.Vector3(43.4,0.0,-37.73),
      new THREE.Vector3(48.82,0.0,-37.73),
      new THREE.Vector3(54.25,0.0,-37.73),
      new THREE.Vector3(59.67,0.0,-37.73),
      new THREE.Vector3(65.1,0.0,-37.73),
      new THREE.Vector3(70.52,0.0,-37.73),
      new THREE.Vector3(75.95,0.0,-37.73),
      new THREE.Vector3(81.37,0.0,-37.73)],
  [
      new THREE.Vector3(-81.37,0.0,-32.25),
      new THREE.Vector3(-75.95,0.0,-32.25),
      new THREE.Vector3(-70.52,0.0,-32.25),
      new THREE.Vector3(-65.1,0.0,-32.25),
      new THREE.Vector3(-59.67,0.0,-32.25),
      new THREE.Vector3(-54.25,0.0,-32.25),
      new THREE.Vector3(-48.82,0.0,-32.25),
      new THREE.Vector3(-43.4,0.0,-32.25),
      new THREE.Vector3(-37.97,0.0,-32.25),
      new THREE.Vector3(-32.55,0.0,-32.25),
      new THREE.Vector3(-27.12,0.0,-32.25),
      new THREE.Vector3(-21.7,0.0,-32.25),
      new THREE.Vector3(-16.27,0.0,-32.25),
      new THREE.Vector3(-10.85,0.0,-32.25),
      new THREE.Vector3(-5.42,0.0,-32.25),
      new THREE.Vector3(0.0,0.0,-32.25),
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,-32.25),
      new THREE.Vector3(43.4,0.0,-32.25),
      new THREE.Vector3(48.82,0.0,-32.25),
      new THREE.Vector3(54.25,0.0,-32.25),
      new THREE.Vector3(59.67,0.0,-32.25),
      new THREE.Vector3(65.1,0.0,-32.25),
      new THREE.Vector3(70.52,0.0,-32.25),
      new THREE.Vector3(75.95,0.0,-32.25),
      new THREE.Vector3(81.37,0.0,-32.25)],
  [
      new THREE.Vector3(-81.37,0.0,-26.76),
      new THREE.Vector3(-75.95,0.0,-26.76),
      new THREE.Vector3(-70.52,0.0,-26.76),
      new THREE.Vector3(-65.1,0.0,-26.76),
      new THREE.Vector3(-59.67,0.0,-26.76),
      new THREE.Vector3(-54.25,0.0,-26.76),
      new THREE.Vector3(-48.82,0.0,-26.76),
      new THREE.Vector3(-43.4,0.0,-26.76),
      new THREE.Vector3(-37.97,0.0,-26.76),
      new THREE.Vector3(-32.55,0.0,-26.76),
      new THREE.Vector3(-27.12,0.0,-26.76),
      new THREE.Vector3(-21.7,0.0,-26.76),
      new THREE.Vector3(-16.27,0.0,-26.76),
      new THREE.Vector3(-10.85,0.0,-26.76),
      new THREE.Vector3(-5.42,0.0,-26.76),
      new THREE.Vector3(0.0,0.0,-26.76),
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,-26.76),
      new THREE.Vector3(43.4,0.0,-26.76),
      new THREE.Vector3(48.82,0.0,-26.76),
      new THREE.Vector3(54.25,0.0,-26.76),
      new THREE.Vector3(59.67,0.0,-26.76),
      new THREE.Vector3(65.1,0.0,-26.76),
      new THREE.Vector3(70.52,0.0,-26.76),
      new THREE.Vector3(75.95,0.0,-26.76),
      new THREE.Vector3(81.37,0.0,-26.76)],
  [
      new THREE.Vector3(-81.37,0.0,-21.27),
      new THREE.Vector3(-75.95,0.0,-21.27),
      new THREE.Vector3(-70.52,0.0,-21.27),
      new THREE.Vector3(-65.1,0.0,-21.27),
      new THREE.Vector3(-59.67,0.0,-21.27),
      new THREE.Vector3(-54.25,0.0,-21.27),
      new THREE.Vector3(-48.82,0.0,-21.27),
      new THREE.Vector3(-43.4,0.0,-21.27),
      new THREE.Vector3(-37.97,0.0,-21.27),
      new THREE.Vector3(-32.55,0.0,-21.27),
      new THREE.Vector3(-27.12,0.0,-21.27),
      new THREE.Vector3(-21.7,0.0,-21.27),
      new THREE.Vector3(-16.27,0.0,-21.27),
      new THREE.Vector3(-10.85,0.0,-21.27),
      new THREE.Vector3(-5.42,0.0,-21.27),
      new THREE.Vector3(0.0,0.0,-21.27),
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,-21.27),
      new THREE.Vector3(43.4,0.0,-21.27),
      new THREE.Vector3(48.82,0.0,-21.27),
      new THREE.Vector3(54.25,0.0,-21.27),
      new THREE.Vector3(59.67,0.0,-21.27),
      new THREE.Vector3(65.1,0.0,-21.27),
      new THREE.Vector3(70.52,0.0,-21.27),
      new THREE.Vector3(75.95,0.0,-21.27),
      new THREE.Vector3(81.37,0.0,-21.27)],
  [
      new THREE.Vector3(-81.37,0.0,-15.78),
      new THREE.Vector3(-75.95,0.0,-15.78),
      new THREE.Vector3(-70.52,0.0,-15.78),
      new THREE.Vector3(-65.1,0.0,-15.78),
      new THREE.Vector3(-59.67,0.0,-15.78),
      new THREE.Vector3(-54.25,0.0,-15.78),
      new THREE.Vector3(-48.82,0.0,-15.78),
      new THREE.Vector3(-43.4,0.0,-15.78),
      new THREE.Vector3(-37.97,0.0,-15.78),
      new THREE.Vector3(-32.55,0.0,-15.78),
      new THREE.Vector3(-27.12,0.0,-15.78),
      new THREE.Vector3(-21.7,0.0,-15.78),
      new THREE.Vector3(-16.27,0.0,-15.78),
      new THREE.Vector3(-10.85,0.0,-15.78),
      new THREE.Vector3(-5.42,0.0,-15.78),
      new THREE.Vector3(0.0,0.0,-15.78),
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,-15.78),
      new THREE.Vector3(43.4,0.0,-15.78),
      new THREE.Vector3(48.82,0.0,-15.78),
      new THREE.Vector3(54.25,0.0,-15.78),
      new THREE.Vector3(59.67,0.0,-15.78),
      new THREE.Vector3(65.1,0.0,-15.78),
      new THREE.Vector3(70.52,0.0,-15.78),
      new THREE.Vector3(75.95,0.0,-15.78),
      new THREE.Vector3(81.37,0.0,-15.78)],
  [
      new THREE.Vector3(-81.37,0.0,-10.29),
      new THREE.Vector3(-75.95,0.0,-10.29),
      new THREE.Vector3(-70.52,0.0,-10.29),
      new THREE.Vector3(-65.1,0.0,-10.29),
      new THREE.Vector3(-59.67,0.0,-10.29),
      new THREE.Vector3(-54.25,0.0,-10.29),
      new THREE.Vector3(-48.82,0.0,-10.29),
      new THREE.Vector3(-43.4,0.0,-10.29),
      new THREE.Vector3(-37.97,0.0,-10.29),
      new THREE.Vector3(-32.55,0.0,-10.29),
      new THREE.Vector3(-27.12,0.0,-10.29),
      new THREE.Vector3(-21.7,0.0,-10.29),
      new THREE.Vector3(-16.27,0.0,-10.29),
      new THREE.Vector3(-10.85,0.0,-10.29),
      new THREE.Vector3(-5.42,0.0,-10.29),
      new THREE.Vector3(0.0,0.0,-10.29),
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,-10.29),
      new THREE.Vector3(43.4,0.0,-10.29),
      new THREE.Vector3(48.82,0.0,-10.29),
      new THREE.Vector3(54.25,0.0,-10.29),
      new THREE.Vector3(59.67,0.0,-10.29),
      new THREE.Vector3(65.1,0.0,-10.29),
      new THREE.Vector3(70.52,0.0,-10.29),
      new THREE.Vector3(75.95,0.0,-10.29),
      new THREE.Vector3(81.37,0.0,-10.29)],
  [
      new THREE.Vector3(-81.37,0.0,-4.8),
      new THREE.Vector3(-75.95,0.0,-4.8),
      new THREE.Vector3(-70.52,0.0,-4.8),
      new THREE.Vector3(-65.1,0.0,-4.8),
      new THREE.Vector3(-59.67,0.0,-4.8),
      new THREE.Vector3(-54.25,0.0,-4.8),
      new THREE.Vector3(-48.82,0.0,-4.8),
      new THREE.Vector3(-43.4,0.0,-4.8),
      new THREE.Vector3(-37.97,0.0,-4.8),
      new THREE.Vector3(-32.55,0.0,-4.8),
      new THREE.Vector3(-27.12,0.0,-4.8),
      new THREE.Vector3(-21.7,0.0,-4.8),
      new THREE.Vector3(-16.27,0.0,-4.8),
      new THREE.Vector3(-10.85,0.0,-4.8),
      new THREE.Vector3(-5.42,0.0,-4.8),
      new THREE.Vector3(0.0,0.0,-4.8),
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,-4.8),
      new THREE.Vector3(43.4,0.0,-4.8),
      new THREE.Vector3(48.82,0.0,-4.8),
      new THREE.Vector3(54.25,0.0,-4.8),
      new THREE.Vector3(59.67,0.0,-4.8),
      new THREE.Vector3(65.1,0.0,-4.8),
      new THREE.Vector3(70.52,0.0,-4.8),
      new THREE.Vector3(75.95,0.0,-4.8),
      new THREE.Vector3(81.37,0.0,-4.8)],
  [
      new THREE.Vector3(-81.37,0.0,0.69),
      new THREE.Vector3(-75.95,0.0,0.69),
      new THREE.Vector3(-70.52,0.0,0.69),
      new THREE.Vector3(-65.1,0.0,0.69),
      new THREE.Vector3(-59.67,0.0,0.69),
      new THREE.Vector3(-54.25,0.0,0.69),
      new THREE.Vector3(-48.82,0.0,0.69),
      new THREE.Vector3(-43.4,0.0,0.69),
      new THREE.Vector3(-37.97,0.0,0.69),
      new THREE.Vector3(-32.55,0.0,0.69),
      new THREE.Vector3(-27.12,0.0,0.69),
      new THREE.Vector3(-21.7,0.0,0.69),
      new THREE.Vector3(-16.27,0.0,0.69),
      new THREE.Vector3(-10.85,0.0,0.69),
      new THREE.Vector3(-5.42,0.0,0.69),
      new THREE.Vector3(0.0,0.0,0.69),
      new THREE.Vector3(5.42,0.0,0.69),
      new THREE.Vector3(10.85,0.0,0.69),
      new THREE.Vector3(16.27,0.0,0.69),
      new THREE.Vector3(21.7,0.0,0.69),
      new THREE.Vector3(27.12,0.0,0.69),
      new THREE.Vector3(32.55,0.0,0.69),
      new THREE.Vector3(37.97,0.0,0.69),
      new THREE.Vector3(43.4,0.0,0.69),
      new THREE.Vector3(48.82,0.0,0.69),
      new THREE.Vector3(54.25,0.0,0.69),
      new THREE.Vector3(59.67,0.0,0.69),
      new THREE.Vector3(65.1,0.0,0.69),
      new THREE.Vector3(70.52,0.0,0.69),
      new THREE.Vector3(75.95,0.0,0.69),
      new THREE.Vector3(81.37,0.0,0.69)],
  [
      new THREE.Vector3(-81.37,0.0,6.17),
      new THREE.Vector3(-75.95,0.0,6.17),
      new THREE.Vector3(-70.52,0.0,6.17),
      new THREE.Vector3(-65.1,0.0,6.17),
      new THREE.Vector3(-59.67,0.0,6.17),
      new THREE.Vector3(-54.25,0.0,6.17),
      new THREE.Vector3(-48.82,0.0,6.17),
      new THREE.Vector3(-43.4,0.0,6.17),
      new THREE.Vector3(-37.97,0.0,6.17),
      new THREE.Vector3(-32.55,0.0,6.17),
      new THREE.Vector3(-27.12,0.0,6.17),
      new THREE.Vector3(-21.7,0.0,6.17),
      new THREE.Vector3(-16.27,0.0,6.17),
      new THREE.Vector3(-10.85,0.0,6.17),
      new THREE.Vector3(-5.42,0.0,6.17),
      new THREE.Vector3(0.0,0.0,6.17),
      new THREE.Vector3(5.42,0.0,6.17),
      new THREE.Vector3(10.85,0.0,6.17),
      new THREE.Vector3(16.27,0.0,6.17),
      new THREE.Vector3(21.7,0.0,6.17),
      new THREE.Vector3(27.12,0.0,6.17),
      new THREE.Vector3(32.55,0.0,6.17),
      new THREE.Vector3(37.97,0.0,6.17),
      new THREE.Vector3(43.4,0.0,6.17),
      new THREE.Vector3(48.82,0.0,6.17),
      new THREE.Vector3(54.25,0.0,6.17),
      new THREE.Vector3(59.67,0.0,6.17),
      new THREE.Vector3(65.1,0.0,6.17),
      new THREE.Vector3(70.52,0.0,6.17),
      new THREE.Vector3(75.95,0.0,6.17),
      new THREE.Vector3(81.37,0.0,6.17)],
  [
      new THREE.Vector3(-81.37,0.0,11.66),
      new THREE.Vector3(-75.95,0.0,11.66),
      new THREE.Vector3(-70.52,0.0,11.66),
      new THREE.Vector3(-65.1,0.0,11.66),
      new THREE.Vector3(-59.67,0.0,11.66),
      new THREE.Vector3(-54.25,0.0,11.66),
      new THREE.Vector3(-48.82,0.0,11.66),
      new THREE.Vector3(-43.4,0.0,11.66),
      new THREE.Vector3(-37.97,0.0,11.66),
      new THREE.Vector3(-32.55,0.0,11.66),
      new THREE.Vector3(-27.12,0.0,11.66),
      new THREE.Vector3(-21.7,0.0,11.66),
      new THREE.Vector3(-16.27,0.0,11.66),
      new THREE.Vector3(-10.85,0.0,11.66),
      new THREE.Vector3(-5.42,0.0,11.66),
      new THREE.Vector3(0.0,0.0,11.66),
      new THREE.Vector3(5.42,0.0,11.66),
      new THREE.Vector3(10.85,0.0,11.66),
      new THREE.Vector3(16.27,0.0,11.66),
      new THREE.Vector3(21.7,0.0,11.66),
      new THREE.Vector3(27.12,0.0,11.66),
      new THREE.Vector3(32.55,0.0,11.66),
      new THREE.Vector3(37.97,0.0,11.66),
      new THREE.Vector3(43.4,0.0,11.66),
      new THREE.Vector3(48.82,0.0,11.66),
      new THREE.Vector3(54.25,0.0,11.66),
      new THREE.Vector3(59.67,0.0,11.66),
      new THREE.Vector3(65.1,0.0,11.66),
      new THREE.Vector3(70.52,0.0,11.66),
      new THREE.Vector3(75.95,0.0,11.66),
      new THREE.Vector3(81.37,0.0,11.66)],
  [
      new THREE.Vector3(-81.37,0.0,17.15),
      new THREE.Vector3(-75.95,0.0,17.15),
      new THREE.Vector3(-70.52,0.0,17.15),
      new THREE.Vector3(-65.1,0.0,17.15),
      new THREE.Vector3(-59.67,0.0,17.15),
      new THREE.Vector3(-54.25,0.0,17.15),
      new THREE.Vector3(-48.82,0.0,17.15),
      new THREE.Vector3(-43.4,0.0,17.15),
      new THREE.Vector3(-37.97,0.0,17.15),
      new THREE.Vector3(-32.55,0.0,17.15),
      new THREE.Vector3(-27.12,0.0,17.15),
      new THREE.Vector3(-21.7,0.0,17.15),
      new THREE.Vector3(-16.27,0.0,17.15),
      new THREE.Vector3(-10.85,0.0,17.15),
      new THREE.Vector3(-5.42,0.0,17.15),
      new THREE.Vector3(0.0,0.0,17.15),
      new THREE.Vector3(5.42,0.0,17.15),
      new THREE.Vector3(10.85,0.0,17.15),
      new THREE.Vector3(16.27,0.0,17.15),
      new THREE.Vector3(21.7,0.0,17.15),
      new THREE.Vector3(27.12,0.0,17.15),
      new THREE.Vector3(32.55,0.0,17.15),
      new THREE.Vector3(37.97,0.0,17.15),
      new THREE.Vector3(43.4,0.0,17.15),
      new THREE.Vector3(48.82,0.0,17.15),
      new THREE.Vector3(54.25,0.0,17.15),
      new THREE.Vector3(59.67,0.0,17.15),
      new THREE.Vector3(65.1,0.0,17.15),
      new THREE.Vector3(70.52,0.0,17.15),
      new THREE.Vector3(75.95,0.0,17.15),
      new THREE.Vector3(81.37,0.0,17.15)],
  [
      new THREE.Vector3(-81.37,0.0,22.64),
      new THREE.Vector3(-75.95,0.0,22.64),
      new THREE.Vector3(-70.52,0.0,22.64),
      new THREE.Vector3(-65.1,0.0,22.64),
      new THREE.Vector3(-59.67,0.0,22.64),
      new THREE.Vector3(-54.25,0.0,22.64),
      new THREE.Vector3(-48.82,0.0,22.64),
      new THREE.Vector3(-43.4,0.0,22.64),
      new THREE.Vector3(-37.97,0.0,22.64),
      new THREE.Vector3(-32.55,0.0,22.64),
      new THREE.Vector3(-27.12,0.0,22.64),
      new THREE.Vector3(-21.7,0.0,22.64),
      new THREE.Vector3(-16.27,0.0,22.64),
      new THREE.Vector3(-10.85,0.0,22.64),
      new THREE.Vector3(-5.42,0.0,22.64),
      new THREE.Vector3(0.0,0.0,22.64),
      new THREE.Vector3(5.42,0.0,22.64),
      new THREE.Vector3(10.85,0.0,22.64),
      new THREE.Vector3(16.27,0.0,22.64),
      new THREE.Vector3(21.7,0.0,22.64),
      new THREE.Vector3(27.12,0.0,22.64),
      new THREE.Vector3(32.55,0.0,22.64),
      new THREE.Vector3(37.97,0.0,22.64),
      new THREE.Vector3(43.4,0.0,22.64),
      new THREE.Vector3(48.82,0.0,22.64),
      new THREE.Vector3(54.25,0.0,22.64),
      new THREE.Vector3(59.67,0.0,22.64),
      new THREE.Vector3(65.1,0.0,22.64),
      new THREE.Vector3(70.52,0.0,22.64),
      new THREE.Vector3(75.95,0.0,22.64),
      new THREE.Vector3(81.37,0.0,22.64)],
  [
      new THREE.Vector3(-81.37,0.0,28.13),
      new THREE.Vector3(-75.95,0.0,28.13),
      new THREE.Vector3(-70.52,0.0,28.13),
      new THREE.Vector3(-65.1,0.0,28.13),
      new THREE.Vector3(-59.67,0.0,28.13),
      new THREE.Vector3(-54.25,0.0,28.13),
      new THREE.Vector3(-48.82,0.0,28.13),
      new THREE.Vector3(-43.4,0.0,28.13),
      new THREE.Vector3(-37.97,0.0,28.13),
      new THREE.Vector3(-32.55,0.0,28.13),
      new THREE.Vector3(-27.12,0.0,28.13),
      new THREE.Vector3(-21.7,0.0,28.13),
      new THREE.Vector3(-16.27,0.0,28.13),
      new THREE.Vector3(-10.85,0.0,28.13),
      new THREE.Vector3(-5.42,0.0,28.13),
      new THREE.Vector3(0.0,0.0,28.13),
      new THREE.Vector3(5.42,0.0,28.13),
      new THREE.Vector3(10.85,0.0,28.13),
      new THREE.Vector3(16.27,0.0,28.13),
      new THREE.Vector3(21.7,0.0,28.13),
      new THREE.Vector3(27.12,0.0,28.13),
      new THREE.Vector3(32.55,0.0,28.13),
      new THREE.Vector3(37.97,0.0,28.13),
      new THREE.Vector3(43.4,0.0,28.13),
      new THREE.Vector3(48.82,0.0,28.13),
      new THREE.Vector3(54.25,0.0,28.13),
      new THREE.Vector3(59.67,0.0,28.13),
      new THREE.Vector3(65.1,0.0,28.13),
      new THREE.Vector3(70.52,0.0,28.13),
      new THREE.Vector3(75.95,0.0,28.13),
      new THREE.Vector3(81.37,0.0,28.13)],
  [
      new THREE.Vector3(-81.37,0.0,33.62),
      new THREE.Vector3(-75.95,0.0,33.62),
      new THREE.Vector3(-70.52,0.0,33.62),
      new THREE.Vector3(-65.1,0.0,33.62),
      new THREE.Vector3(-59.67,0.0,33.62),
      new THREE.Vector3(-54.25,0.0,33.62),
      new THREE.Vector3(-48.82,0.0,33.62),
      new THREE.Vector3(-43.4,0.0,33.62),
      new THREE.Vector3(-37.97,0.0,33.62),
      new THREE.Vector3(-32.55,0.0,33.62),
      new THREE.Vector3(-27.12,0.0,33.62),
      new THREE.Vector3(-21.7,0.0,33.62),
      new THREE.Vector3(-16.27,0.0,33.62),
      new THREE.Vector3(-10.85,0.0,33.62),
      new THREE.Vector3(-5.42,0.0,33.62),
      new THREE.Vector3(0.0,0.0,33.62),
      new THREE.Vector3(5.42,0.0,33.62),
      new THREE.Vector3(10.85,0.0,33.62),
      new THREE.Vector3(16.27,0.0,33.62),
      new THREE.Vector3(21.7,0.0,33.62),
      new THREE.Vector3(27.12,0.0,33.62),
      new THREE.Vector3(32.55,0.0,33.62),
      new THREE.Vector3(37.97,0.0,33.62),
      new THREE.Vector3(43.4,0.0,33.62),
      new THREE.Vector3(48.82,0.0,33.62),
      new THREE.Vector3(54.25,0.0,33.62),
      new THREE.Vector3(59.67,0.0,33.62),
      new THREE.Vector3(65.1,0.0,33.62),
      new THREE.Vector3(70.52,0.0,33.62),
      new THREE.Vector3(75.95,0.0,33.62),
      new THREE.Vector3(81.37,0.0,33.62)],
  [
      new THREE.Vector3(-81.37,0.0,39.11),
      new THREE.Vector3(-75.95,0.0,39.11),
      new THREE.Vector3(-70.52,0.0,39.11),
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,39.11),
      new THREE.Vector3(43.4,0.0,39.11),
      new THREE.Vector3(48.82,0.0,39.11),
      new THREE.Vector3(54.25,0.0,39.11),
      new THREE.Vector3(59.67,0.0,39.11),
      new THREE.Vector3(65.1,0.0,39.11),
      new THREE.Vector3(70.52,0.0,39.11),
      new THREE.Vector3(75.95,0.0,39.11),
      new THREE.Vector3(81.37,0.0,39.11)],
  [
      new THREE.Vector3(-81.37,0.0,44.59),
      new THREE.Vector3(-75.95,0.0,44.59),
      new THREE.Vector3(-70.52,0.0,44.59),
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,44.59),
      new THREE.Vector3(43.4,0.0,44.59),
      new THREE.Vector3(48.82,0.0,44.59),
      new THREE.Vector3(54.25,0.0,44.59),
      new THREE.Vector3(59.67,0.0,44.59),
      new THREE.Vector3(65.1,0.0,44.59),
      new THREE.Vector3(70.52,0.0,44.59),
      new THREE.Vector3(75.95,0.0,44.59),
      new THREE.Vector3(81.37,0.0,44.59)],
  [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,50.08),
      new THREE.Vector3(43.4,0.0,50.08),
      new THREE.Vector3(48.82,0.0,50.08),
      new THREE.Vector3(54.25,0.0,50.08),
      new THREE.Vector3(59.67,0.0,50.08),
      new THREE.Vector3(65.1,0.0,50.08),
      new THREE.Vector3(70.52,0.0,50.08),
      new THREE.Vector3(75.95,0.0,50.08),
      new THREE.Vector3(81.37,0.0,50.08)],
  [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,55.57),
      new THREE.Vector3(43.4,0.0,55.57),
      new THREE.Vector3(48.82,0.0,55.57),
      new THREE.Vector3(54.25,0.0,55.57),
      new THREE.Vector3(59.67,0.0,55.57),
      new THREE.Vector3(65.1,0.0,55.57),
      new THREE.Vector3(70.52,0.0,55.57),
      new THREE.Vector3(75.95,0.0,55.57),
      new THREE.Vector3(81.37,0.0,55.57)],
  [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      new THREE.Vector3(37.97,0.0,61.06),
      new THREE.Vector3(43.4,0.0,61.06),
      new THREE.Vector3(48.82,0.0,61.06),
      new THREE.Vector3(54.25,0.0,61.06),
      new THREE.Vector3(59.67,0.0,61.06),
      new THREE.Vector3(65.1,0.0,61.06),
      new THREE.Vector3(70.52,0.0,61.06),
      new THREE.Vector3(75.95,0.0,61.06),
      new THREE.Vector3(81.37,0.0,61.06)],
  [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null],
  [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null]

]




// openPlanGridImport

var openPlanGridPts = [];

var vacantPts = new THREE.Group();
vacantPts.name = "vacantPts";

var occupiedPts = new THREE.Group();
occupiedPts.name = "occupiedPts";

scene.add(vacantPts,occupiedPts);

for(i = 0; i < openPlanGridImport.length; i++){
  rowLength = openPlanGridImport[i].length;
  for(z = 0; z < rowLength; z++){
    if(openPlanGridImport[i][z] != null){
      geometry = new THREE.Geometry();
      geometry.vertices.push(openPlanGridImport[i][z]);
      point = new THREE.Points(geometry, aOS_PointStyles.aOS_DarkGrey);
      point.name = i + "," + z;
      openPlanGridPts.push(point);
      scene.getObjectByName("vacantPts").add(point);
      // scene.add(point);
      renderer.render(scene,camera);
    }
  }
}

//myMatrix {}
  //row {}
    //column {}
      //point {}
      //weight {}

// function constructMatrixFrom2DArray(inputMatrix){
//
//   for(i = 0; i < inputMatrix.length; i++){
//     var row = new Object(),
//     nameString = i;
//     this.[nameString] = function(inputMatrix[i]){
//
//     }
//     // var obj = new Object(),
//     //   nameString = "row" + i;
//     //   this.obj[nameString] = 2;
//     // for(z = 0; z < inputMatrix[i].length; i++){
//     //   if(inputMatrix[i][z] != null){
//     //
//     //   }
//     // }
//     // geometry = new THREE.Geometry();
//     // geometry.vertices.push(inputMatrix[i]);
//     // point = new THREE.Points(geometry, ptDefaultMaterial);
//     // openPlanGridPts.push(point);
//     // scene.add(point);
//   }
//
//
// }



// var myMatrix = new constructMatrixFrom2DArray(openPlanGridImport); // input array matrix


//Glyphs

//Glyphs
