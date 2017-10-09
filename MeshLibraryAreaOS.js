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
    var material = new THREE.MeshBasicMaterial( { color: 0x0851a4 } );
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
  var material = new THREE.MeshBasicMaterial( { color: 0x0851a4 } );
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

//siteSlab
//siteWalls
var siteWallsLoader = new THREE.JSONLoader();
var siteWallsMesh = null;
var siteWallsGeo = null;
siteWallsLoader.load(
'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/walls.json',
function ( geometry, materials ) {
 siteWallsGeo = geometry;
 var siteWallsMaterial = new THREE.MeshLambertMaterial( { color: 0xf2f2f2, emissive: 0xf2f2f2, emissiveIntensity: 1} );
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
 highlightEdges(siteSectionGeo,1);
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
function highlightEdges(outlineThis, lineW = .5){
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
  console.log(material.opacity);
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

linePoints0 = [
new THREE.Vector2(13.5621032715,-30.8733932748),
new THREE.Vector2(27.1242065430,-17.1518814340),
new THREE.Vector2(40.6863403320,-30.8733932748),
new THREE.Vector2(33.9051818848,-37.7341415658),
new THREE.Vector2(13.5621032715,-37.7341415658)
];
linePoints1 = [
new THREE.Vector2(33.9051513672,3.43040921541),
new THREE.Vector2(40.6863403320,-3.43036959319),
new THREE.Vector2(54.2484130859,10.2911269888),
new THREE.Vector2(40.6863403320,24.0126540885),
new THREE.Vector2(33.9051513672,24.0126540885)
];
linePoints2 = [
new THREE.Vector2(27.1242065430,-17.1518814340),
new THREE.Vector2(40.6863403320,-3.43036959319),
new THREE.Vector2(33.9051513672,3.43040921541),
new THREE.Vector2(13.5621032715,3.43040921541),
new THREE.Vector2(13.5621032715,-3.43036959319)
];
linePoints3 = [
new THREE.Vector2(67.810546875,-58.3164131418),
new THREE.Vector2(54.2484436035,-44.5949013009),
new THREE.Vector2(67.810546875,-30.8733894601),
new THREE.Vector2(81.3726501465,-44.5949013009)
];
linePoints4 = [
new THREE.Vector2(13.5621032715,-30.8733932748),
new THREE.Vector2(0.0,-17.1518814340),
new THREE.Vector2(13.5621032715,-3.43036959319),
new THREE.Vector2(27.1242065430,-17.1518814340)
];
linePoints5 = [
new THREE.Vector2(40.6863403320,-30.8733932748),
new THREE.Vector2(27.1242370605,-17.1518814340),
new THREE.Vector2(40.6863403320,-3.43036959319),
new THREE.Vector2(54.2484436035,-17.1518814340)
];
linePoints6 = [
new THREE.Vector2(54.2484130859,-44.5949013009),
new THREE.Vector2(40.6863098145,-30.8733894601),
new THREE.Vector2(54.2484130859,-17.1518776193),
new THREE.Vector2(67.8105163574,-30.8733894601)
];
linePoints7 = [
new THREE.Vector2(67.810546875,-30.8733932748),
new THREE.Vector2(54.2484436035,-17.1518814340),
new THREE.Vector2(67.810546875,-3.43036959319),
new THREE.Vector2(81.3726501465,-17.1518814340)
];
linePoints8 = [
new THREE.Vector2(67.810546875,24.0126540885),
new THREE.Vector2(54.2484436035,37.7341659293),
new THREE.Vector2(67.810546875,51.4556777701),
new THREE.Vector2(81.3726501465,37.7341659293)
];
linePoints9 = [
new THREE.Vector2(67.810546875,-3.43036959319),
new THREE.Vector2(54.2484436035,10.2911422476),
new THREE.Vector2(67.810546875,24.0126540885),
new THREE.Vector2(81.3726501465,10.2911422476)
];
linePoints10 = [
new THREE.Vector2(54.2484130859,-17.1518814340),
new THREE.Vector2(40.6863098145,-3.43036959319),
new THREE.Vector2(54.2484130859,10.2911422476),
new THREE.Vector2(67.8105163574,-3.43036959319)
];
linePoints11 = [
new THREE.Vector2(54.2484130859,10.2911269888),
new THREE.Vector2(40.6863098145,24.0126388297),
new THREE.Vector2(54.2484130859,37.7341506705),
new THREE.Vector2(67.8105163574,24.0126388297)
];
linePoints12 = [
new THREE.Vector2(54.2484130859,37.7341506705),
new THREE.Vector2(40.6863098145,51.4556625113),
new THREE.Vector2(54.2484130859,65.1771743521),
new THREE.Vector2(67.8105163574,51.4556625113)
];
linePoints13 = [
new THREE.Vector2(27.1242065430,37.7341506705),
new THREE.Vector2(13.5621032715,51.4556625113),
new THREE.Vector2(27.1242065430,65.1771743521),
new THREE.Vector2(40.6863098145,51.4556625113)
];
linePoints14 = [
new THREE.Vector2(0.0,37.7341506705),
new THREE.Vector2(-13.5621032715,51.4556625113),
new THREE.Vector2(0.0,65.1771743521),
new THREE.Vector2(13.5621032715,51.4556625113)
];
linePoints15 = [
new THREE.Vector2(-13.5621032715,24.0126540885),
new THREE.Vector2(-27.1242065430,37.7341659293),
new THREE.Vector2(-13.5621032715,51.4556777701),
new THREE.Vector2(0.0,37.7341659293)
];
linePoints16 = [
new THREE.Vector2(-13.5621032715,-3.43036959319),
new THREE.Vector2(-27.1242065430,10.2911422476),
new THREE.Vector2(-13.5621032715,24.0126540885),
new THREE.Vector2(0.0,10.2911422476)
];
linePoints17 = [
new THREE.Vector2(-13.5621032715,-30.8733932748),
new THREE.Vector2(-27.1242065430,-17.1518814340),
new THREE.Vector2(-13.5621032715,-3.43036959319),
new THREE.Vector2(0.0,-17.1518814340)
];
linePoints18 = [
new THREE.Vector2(-27.1242065430,-17.1518814340),
new THREE.Vector2(-40.6863098145,-3.43036959319),
new THREE.Vector2(-27.1242065430,10.2911422476),
new THREE.Vector2(-13.5621032715,-3.43036959319)
];
linePoints19 = [
new THREE.Vector2(-27.1242065430,10.2911269888),
new THREE.Vector2(-40.6863098145,24.0126388297),
new THREE.Vector2(-27.1242065430,37.7341506705),
new THREE.Vector2(-13.5621032715,24.0126388297)
];
linePoints20 = [
new THREE.Vector2(-27.1242065430,37.7341506705),
new THREE.Vector2(-40.6863098145,51.4556625113),
new THREE.Vector2(-27.1242065430,65.1771743521),
new THREE.Vector2(-13.5621032715,51.4556625113)
];
linePoints21 = [
new THREE.Vector2(-54.2484130859,37.7341506705),
new THREE.Vector2(-67.8105163574,51.4556625113),
new THREE.Vector2(-54.2484130859,65.1771743521),
new THREE.Vector2(-40.6863098145,51.4556625113)
];
linePoints22 = [
new THREE.Vector2(-54.2484130859,10.2911269888),
new THREE.Vector2(-67.8105163574,24.0126388297),
new THREE.Vector2(-54.2484130859,37.7341506705),
new THREE.Vector2(-40.6863098145,24.0126388297)
];
linePoints23 = [
new THREE.Vector2(-54.2484130859,-17.1518814340),
new THREE.Vector2(-67.8105163574,-3.43036959319),
new THREE.Vector2(-54.2484130859,10.2911422476),
new THREE.Vector2(-40.6863098145,-3.43036959319)
];
linePoints24 = [
new THREE.Vector2(-40.6863098145,24.0126540885),
new THREE.Vector2(-54.2484130859,37.7341659293),
new THREE.Vector2(-40.6863098145,51.4556777701),
new THREE.Vector2(-27.1242065430,37.7341659293)
];
linePoints25 = [
new THREE.Vector2(-67.8105163574,24.0126540885),
new THREE.Vector2(-81.3726196289,37.7341659293),
new THREE.Vector2(-67.8105163574,51.4556777701),
new THREE.Vector2(-54.2484130859,37.7341659293)
];
linePoints26 = [
new THREE.Vector2(-67.8105163574,-3.43036959319),
new THREE.Vector2(-81.3726196289,10.2911422476),
new THREE.Vector2(-67.8105163574,24.0126540885),
new THREE.Vector2(-54.2484130859,10.2911422476)
];
linePoints27 = [
new THREE.Vector2(-40.6863098145,-3.43036959319),
new THREE.Vector2(-54.2484130859,10.2911422476),
new THREE.Vector2(-40.6863098145,24.0126540885),
new THREE.Vector2(-27.1242065430,10.2911422476)
];
linePoints28 = [
new THREE.Vector2(-40.6863098145,-30.8733932748),
new THREE.Vector2(-54.2484130859,-17.1518814340),
new THREE.Vector2(-40.6863098145,-3.43036959319),
new THREE.Vector2(-27.1242065430,-17.1518814340)
];
linePoints29 = [
new THREE.Vector2(-67.8105163574,-30.8733932748),
new THREE.Vector2(-81.3726196289,-17.1518814340),
new THREE.Vector2(-67.8105163574,-3.43036959319),
new THREE.Vector2(-54.2484130859,-17.1518814340)
];
linePoints30 = [
new THREE.Vector2(33.9051513672,3.43040921541),
new THREE.Vector2(40.6863403320,-3.43036959319),
new THREE.Vector2(54.2484130859,-3.43036959319),
new THREE.Vector2(54.2484130859,10.2911269888),
new THREE.Vector2(33.9051513672,10.2911269888)
];
linePoints31 = [
new THREE.Vector2(33.9051818848,-44.5949013009),
new THREE.Vector2(33.9051818848,-37.7341415658),
new THREE.Vector2(40.6863403320,-30.8733932748),
new THREE.Vector2(54.2484130859,-30.8733932748),
new THREE.Vector2(54.2484130859,-44.5949013009)
];
linePoints32 = [
new THREE.Vector2(27.1242065430,-37.7341415658),
new THREE.Vector2(27.1242065430,-17.1518814340),
new THREE.Vector2(40.6863403320,-17.1518814340),
new THREE.Vector2(40.6863403320,-30.8733932748),
new THREE.Vector2(33.9051818848,-37.7341415658)
];
linePoints33 = [
new THREE.Vector2(27.1241149902,3.43040921541),
new THREE.Vector2(33.9051513672,3.43040921541),
new THREE.Vector2(40.6863403320,-3.43036959319),
new THREE.Vector2(40.6863403320,-17.1518814340),
new THREE.Vector2(27.1242065430,-17.1518814340)
];
linePoints34 = [
new THREE.Vector2(40.6863403320,-17.1518814340),
new THREE.Vector2(54.2484130859,-17.1518814340),
new THREE.Vector2(54.2484130859,-3.43036959319),
new THREE.Vector2(40.6863403320,-3.43036959319)
];
linePoints35 = [
new THREE.Vector2(40.6863403320,-30.8733932748),
new THREE.Vector2(54.2484130859,-30.8733932748),
new THREE.Vector2(54.2484130859,-17.1518814340),
new THREE.Vector2(40.6863403320,-17.1518814340)
];
linePoints36 = [
new THREE.Vector2(67.810546875,-44.5949013009),
new THREE.Vector2(81.3726196289,-44.5949013009),
new THREE.Vector2(81.3726196289,-30.8733932748),
new THREE.Vector2(67.810546875,-30.8733932748)
];
linePoints37 = [
new THREE.Vector2(67.810546875,-30.8733932748),
new THREE.Vector2(81.3726196289,-30.8733932748),
new THREE.Vector2(81.3726196289,-17.1518814340),
new THREE.Vector2(67.810546875,-17.1518814340)
];
linePoints38 = [
new THREE.Vector2(67.810546875,-17.1518814340),
new THREE.Vector2(81.3726196289,-17.1518814340),
new THREE.Vector2(81.3726196289,-3.43036959319),
new THREE.Vector2(67.810546875,-3.43036959319)
];
linePoints39 = [
new THREE.Vector2(67.810546875,-3.43036959319),
new THREE.Vector2(81.3726196289,-3.43036959319),
new THREE.Vector2(81.3726196289,10.2911269888),
new THREE.Vector2(67.810546875,10.2911269888)
];
linePoints40 = [
new THREE.Vector2(54.2484130859,-3.43036959319),
new THREE.Vector2(67.810546875,-3.43036959319),
new THREE.Vector2(67.810546875,10.2911269888),
new THREE.Vector2(54.2484130859,10.2911269888)
];
linePoints41 = [
new THREE.Vector2(54.2484130859,-17.1518814340),
new THREE.Vector2(67.810546875,-17.1518814340),
new THREE.Vector2(67.810546875,-3.43036959319),
new THREE.Vector2(54.2484130859,-3.43036959319)
];
linePoints42 = [
new THREE.Vector2(54.2484130859,-30.8733932748),
new THREE.Vector2(67.810546875,-30.8733932748),
new THREE.Vector2(67.810546875,-17.1518814340),
new THREE.Vector2(54.2484130859,-17.1518814340)
];
linePoints43 = [
new THREE.Vector2(54.2484130859,-44.5949013009),
new THREE.Vector2(67.810546875,-44.5949013009),
new THREE.Vector2(67.810546875,-30.8733932748),
new THREE.Vector2(54.2484130859,-30.8733932748)
];
linePoints44 = [
new THREE.Vector2(67.810546875,10.2911269888),
new THREE.Vector2(81.3726196289,10.2911269888),
new THREE.Vector2(81.3726196289,24.0126540885),
new THREE.Vector2(67.810546875,24.0126540885)
];
linePoints45 = [
new THREE.Vector2(54.2484130859,10.2911269888),
new THREE.Vector2(67.810546875,10.2911269888),
new THREE.Vector2(67.810546875,24.0126540885),
new THREE.Vector2(54.2484130859,24.0126540885)
];
linePoints46 = [
new THREE.Vector2(67.810546875,24.0126540885),
new THREE.Vector2(81.3726196289,24.0126540885),
new THREE.Vector2(81.3726196289,37.7341506705),
new THREE.Vector2(67.810546875,37.7341506705)
];
linePoints47 = [
new THREE.Vector2(54.2484130859,24.0126540885),
new THREE.Vector2(67.810546875,24.0126540885),
new THREE.Vector2(67.810546875,37.7341506705),
new THREE.Vector2(54.2484130859,37.7341506705)
];
linePoints48 = [
new THREE.Vector2(67.810546875,37.7341506705),
new THREE.Vector2(81.3726196289,37.7341506705),
new THREE.Vector2(81.3726196289,51.4556777701),
new THREE.Vector2(67.810546875,51.4556777701)
];
linePoints49 = [
new THREE.Vector2(67.810546875,51.4556777701),
new THREE.Vector2(81.3726196289,51.4556777701),
new THREE.Vector2(81.3726196289,65.1771743521),
new THREE.Vector2(67.810546875,65.1771743521)
];
linePoints50 = [
new THREE.Vector2(54.2484130859,51.4556777701),
new THREE.Vector2(67.810546875,51.4556777701),
new THREE.Vector2(67.810546875,65.1771743521),
new THREE.Vector2(54.2484130859,65.1771743521)
];
linePoints51 = [
new THREE.Vector2(54.2484130859,37.7341506705),
new THREE.Vector2(67.810546875,37.7341506705),
new THREE.Vector2(67.810546875,51.4556777701),
new THREE.Vector2(54.2484130859,51.4556777701)
];
linePoints52 = [
new THREE.Vector2(33.9051818848,-65.1771614328),
new THREE.Vector2(54.2484130859,-65.1771614328),
new THREE.Vector2(54.2484130859,-44.5949013009),
new THREE.Vector2(33.9051818848,-44.5949013009)
];
linePoints53 = [
new THREE.Vector2(54.2484130859,-65.1771614328),
new THREE.Vector2(67.810546875,-65.1771614328),
new THREE.Vector2(67.810546875,-44.5949013009),
new THREE.Vector2(54.2484130859,-44.5949013009)
];
linePoints54 = [
new THREE.Vector2(67.810546875,-65.1771614328),
new THREE.Vector2(81.3726196289,-65.1771614328),
new THREE.Vector2(81.3726196289,-44.5949013009),
new THREE.Vector2(67.810546875,-44.5949013009)
];
linePoints55 = [
new THREE.Vector2(33.9051513672,10.2911269888),
new THREE.Vector2(54.2484130859,10.2911269888),
new THREE.Vector2(54.2484130859,24.0126540885),
new THREE.Vector2(33.9051513672,24.0126540885)
];
linePoints56 = [
new THREE.Vector2(33.9051513672,24.0126540885),
new THREE.Vector2(54.2484130859,24.0126540885),
new THREE.Vector2(54.2484130859,37.7341506705),
new THREE.Vector2(33.9051513672,37.7341506705)
];
linePoints57 = [
new THREE.Vector2(13.5621032715,-17.1518814340),
new THREE.Vector2(27.1241149902,-17.1518814340),
new THREE.Vector2(27.1241149902,3.43040921541),
new THREE.Vector2(13.5621032715,3.43040921541)
];
linePoints58 = [
new THREE.Vector2(0.0,-17.1518814340),
new THREE.Vector2(13.5621032715,-17.1518814340),
new THREE.Vector2(13.5621032715,3.43040921541),
new THREE.Vector2(0.0,3.43040921541)
];
linePoints59 = [
new THREE.Vector2(13.5621032715,-37.7341415658),
new THREE.Vector2(27.1242065430,-37.7341415658),
new THREE.Vector2(27.1242065430,-17.1518814340),
new THREE.Vector2(13.5621032715,-17.1518814340)
];
linePoints60 = [
new THREE.Vector2(0.0,-37.7341415658),
new THREE.Vector2(13.5621032715,-37.7341415658),
new THREE.Vector2(13.5621032715,-17.1518814340),
new THREE.Vector2(0.0,-17.1518814340)
];
linePoints61 = [
new THREE.Vector2(-13.5621032715,-37.7341415658),
new THREE.Vector2(0.0,-37.7341415658),
new THREE.Vector2(0.0,-17.1518814340),
new THREE.Vector2(-13.5621032715,-17.1518814340)
];
linePoints62 = [
new THREE.Vector2(-27.1242065430,-37.7341415658),
new THREE.Vector2(-13.5621032715,-37.7341415658),
new THREE.Vector2(-13.5621032715,-17.1518814340),
new THREE.Vector2(-27.1242065430,-17.1518814340)
];
linePoints63 = [
new THREE.Vector2(-40.6863098145,-37.7341415658),
new THREE.Vector2(-27.1242065430,-37.7341415658),
new THREE.Vector2(-27.1242065430,-17.1518814340),
new THREE.Vector2(-40.6863098145,-17.1518814340)
];
linePoints64 = [
new THREE.Vector2(-54.2484130859,-37.7341415658),
new THREE.Vector2(-40.6863098145,-37.7341415658),
new THREE.Vector2(-40.6863098145,-17.1518814340),
new THREE.Vector2(-54.2484130859,-17.1518814340)
];
linePoints65 = [
new THREE.Vector2(-67.8105163574,-37.7341415658),
new THREE.Vector2(-54.2484130859,-37.7341415658),
new THREE.Vector2(-54.2484130859,-17.1518814340),
new THREE.Vector2(-67.8105163574,-17.1518814340)
];
linePoints66 = [
new THREE.Vector2(40.6863403320,51.4556777701),
new THREE.Vector2(54.2484130859,51.4556777701),
new THREE.Vector2(54.2484130859,65.1771743521),
new THREE.Vector2(40.6863403320,65.1771743521)
];
linePoints67 = [
new THREE.Vector2(40.6863403320,37.7341506705),
new THREE.Vector2(54.2484130859,37.7341506705),
new THREE.Vector2(54.2484130859,51.4556777701),
new THREE.Vector2(40.6863403320,51.4556777701)
];
linePoints68 = [
new THREE.Vector2(27.1242065430,51.4556777701),
new THREE.Vector2(40.6863403320,51.4556777701),
new THREE.Vector2(40.6863403320,65.1771743521),
new THREE.Vector2(27.1242065430,65.1771743521)
];
linePoints69 = [
new THREE.Vector2(27.1242065430,37.7341506705),
new THREE.Vector2(40.6863403320,37.7341506705),
new THREE.Vector2(40.6863403320,51.4556777701),
new THREE.Vector2(27.1242065430,51.4556777701)
];
linePoints70 = [
new THREE.Vector2(13.5621032715,51.4556777701),
new THREE.Vector2(27.1242065430,51.4556777701),
new THREE.Vector2(27.1242065430,65.1771743521),
new THREE.Vector2(13.5621032715,65.1771743521)
];
linePoints71 = [
new THREE.Vector2(13.5621032715,37.7341506705),
new THREE.Vector2(27.1242065430,37.7341506705),
new THREE.Vector2(27.1242065430,51.4556777701),
new THREE.Vector2(13.5621032715,51.4556777701)
];
linePoints72 = [
new THREE.Vector2(0.0,51.4556777701),
new THREE.Vector2(13.5621032715,51.4556777701),
new THREE.Vector2(13.5621032715,65.1771743521),
new THREE.Vector2(0.0,65.1771743521)
];
linePoints73 = [
new THREE.Vector2(0.0,37.7341506705),
new THREE.Vector2(13.5621032715,37.7341506705),
new THREE.Vector2(13.5621032715,51.4556777701),
new THREE.Vector2(0.0,51.4556777701)
];
linePoints74 = [
new THREE.Vector2(-13.5621032715,51.4556777701),
new THREE.Vector2(-0.000128680995772,51.4556777701),
new THREE.Vector2(-0.000128680995772,65.1771743521),
new THREE.Vector2(-13.5621032715,65.1771743521)
];
linePoints75 = [
new THREE.Vector2(-13.5621032715,37.7341475607),
new THREE.Vector2(-0.000128680995772,37.7341475607),
new THREE.Vector2(-0.000128680995772,51.4556777701),
new THREE.Vector2(-13.5621032715,51.4556777701)
];
linePoints76 = [
new THREE.Vector2(-13.5621032715,24.0126540885),
new THREE.Vector2(0.0,24.0126540885),
new THREE.Vector2(0.0,37.7341506705),
new THREE.Vector2(-13.5621032715,37.7341506705)
];
linePoints77 = [
new THREE.Vector2(-13.5621032715,10.2911269888),
new THREE.Vector2(0.0,10.2911269888),
new THREE.Vector2(0.0,24.0126540885),
new THREE.Vector2(-13.5621032715,24.0126540885)
];
linePoints78 = [
new THREE.Vector2(-13.5621032715,-3.43036959319),
new THREE.Vector2(0.0,-3.43036959319),
new THREE.Vector2(0.0,10.2911269888),
new THREE.Vector2(-13.5621032715,10.2911269888)
];
linePoints79 = [
new THREE.Vector2(-13.5621032715,-17.1518814340),
new THREE.Vector2(0.0,-17.1518814340),
new THREE.Vector2(0.0,-3.43036959319),
new THREE.Vector2(-13.5621032715,-3.43036959319)
];
linePoints80 = [
new THREE.Vector2(-27.1242065430,51.4556777701),
new THREE.Vector2(-13.5621032715,51.4556777701),
new THREE.Vector2(-13.5621032715,65.1771743521),
new THREE.Vector2(-27.1242065430,65.1771743521)
];
linePoints81 = [
new THREE.Vector2(-27.1242065430,37.7341506705),
new THREE.Vector2(-13.5621032715,37.7341506705),
new THREE.Vector2(-13.5621032715,51.4556777701),
new THREE.Vector2(-27.1242065430,51.4556777701)
];
linePoints82 = [
new THREE.Vector2(-27.1242065430,24.0126540885),
new THREE.Vector2(-13.5621032715,24.0126540885),
new THREE.Vector2(-13.5621032715,37.7341506705),
new THREE.Vector2(-27.1242065430,37.7341506705)
];
linePoints83 = [
new THREE.Vector2(-27.1242065430,10.2911269888),
new THREE.Vector2(-13.5621032715,10.2911269888),
new THREE.Vector2(-13.5621032715,24.0126540885),
new THREE.Vector2(-27.1242065430,24.0126540885)
];
linePoints84 = [
new THREE.Vector2(-27.1242065430,-3.43036959319),
new THREE.Vector2(-13.5621032715,-3.43036959319),
new THREE.Vector2(-13.5621032715,10.2911269888),
new THREE.Vector2(-27.1242065430,10.2911269888)
];
linePoints85 = [
new THREE.Vector2(-27.1242065430,-17.1518814340),
new THREE.Vector2(-13.5621032715,-17.1518814340),
new THREE.Vector2(-13.5621032715,-3.43036959319),
new THREE.Vector2(-27.1242065430,-3.43036959319)
];
linePoints86 = [
new THREE.Vector2(-40.6863098145,51.4556777701),
new THREE.Vector2(-27.1242065430,51.4556777701),
new THREE.Vector2(-27.1242065430,65.1771743521),
new THREE.Vector2(-40.6863098145,65.1771743521)
];
linePoints87 = [
new THREE.Vector2(-40.6863098145,37.7341506705),
new THREE.Vector2(-27.1242065430,37.7341506705),
new THREE.Vector2(-27.1242065430,51.4556777701),
new THREE.Vector2(-40.6863098145,51.4556777701)
];
linePoints88 = [
new THREE.Vector2(-40.6863098145,24.0126540885),
new THREE.Vector2(-27.1242065430,24.0126540885),
new THREE.Vector2(-27.1242065430,37.7341506705),
new THREE.Vector2(-40.6863098145,37.7341506705)
];
linePoints89 = [
new THREE.Vector2(-40.6863098145,10.2911269888),
new THREE.Vector2(-27.1242065430,10.2911269888),
new THREE.Vector2(-27.1242065430,24.0126540885),
new THREE.Vector2(-40.6863098145,24.0126540885)
];
linePoints90 = [
new THREE.Vector2(-40.6863098145,-3.43036959319),
new THREE.Vector2(-27.1242065430,-3.43036959319),
new THREE.Vector2(-27.1242065430,10.2911269888),
new THREE.Vector2(-40.6863098145,10.2911269888)
];
linePoints91 = [
new THREE.Vector2(-40.6863098145,-17.1518814340),
new THREE.Vector2(-27.1242065430,-17.1518814340),
new THREE.Vector2(-27.1242065430,-3.43036959319),
new THREE.Vector2(-40.6863098145,-3.43036959319)
];
linePoints92 = [
new THREE.Vector2(-54.2484130859,51.4556777701),
new THREE.Vector2(-40.6863098145,51.4556777701),
new THREE.Vector2(-40.6863098145,65.1771743521),
new THREE.Vector2(-54.2484130859,65.1771743521)
];
linePoints93 = [
new THREE.Vector2(-54.2484130859,37.7341506705),
new THREE.Vector2(-40.6863098145,37.7341506705),
new THREE.Vector2(-40.6863098145,51.4556777701),
new THREE.Vector2(-54.2484130859,51.4556777701)
];
linePoints94 = [
new THREE.Vector2(-54.2484130859,24.0126540885),
new THREE.Vector2(-40.6863098145,24.0126540885),
new THREE.Vector2(-40.6863098145,37.7341506705),
new THREE.Vector2(-54.2484130859,37.7341506705)
];
linePoints95 = [
new THREE.Vector2(-54.2484130859,10.2911269888),
new THREE.Vector2(-40.6863098145,10.2911269888),
new THREE.Vector2(-40.6863098145,24.0126540885),
new THREE.Vector2(-54.2484130859,24.0126540885)
];
linePoints96 = [
new THREE.Vector2(-54.2484130859,-3.43036959319),
new THREE.Vector2(-40.6863098145,-3.43036959319),
new THREE.Vector2(-40.6863098145,10.2911269888),
new THREE.Vector2(-54.2484130859,10.2911269888)
];
linePoints97 = [
new THREE.Vector2(-54.2484130859,-17.1518814340),
new THREE.Vector2(-40.6863098145,-17.1518814340),
new THREE.Vector2(-40.6863098145,-3.43036959319),
new THREE.Vector2(-54.2484130859,-3.43036959319)
];
linePoints98 = [
new THREE.Vector2(-67.8105163574,51.4556777701),
new THREE.Vector2(-54.2484130859,51.4556777701),
new THREE.Vector2(-54.2484130859,65.1771743521),
new THREE.Vector2(-67.8105163574,65.1771743521)
];
linePoints99 = [
new THREE.Vector2(-67.8105163574,37.7341506705),
new THREE.Vector2(-54.2484130859,37.7341506705),
new THREE.Vector2(-54.2484130859,51.4556777701),
new THREE.Vector2(-67.8105163574,51.4556777701)
];
linePoints100 = [
new THREE.Vector2(-67.8105163574,24.0126540885),
new THREE.Vector2(-54.2484130859,24.0126540885),
new THREE.Vector2(-54.2484130859,37.7341506705),
new THREE.Vector2(-67.8105163574,37.7341506705)
];
linePoints101 = [
new THREE.Vector2(-67.8105163574,10.2911269888),
new THREE.Vector2(-54.2484130859,10.2911269888),
new THREE.Vector2(-54.2484130859,24.0126540885),
new THREE.Vector2(-67.8105163574,24.0126540885)
];
linePoints102 = [
new THREE.Vector2(-67.8105163574,-3.43036959319),
new THREE.Vector2(-54.2484130859,-3.43036959319),
new THREE.Vector2(-54.2484130859,10.2911269888),
new THREE.Vector2(-67.8105163574,10.2911269888)
];
linePoints103 = [
new THREE.Vector2(-67.8105163574,-17.1518814340),
new THREE.Vector2(-54.2484130859,-17.1518814340),
new THREE.Vector2(-54.2484130859,-3.43036959319),
new THREE.Vector2(-67.8105163574,-3.43036959319)
];
linePoints104 = [
new THREE.Vector2(-81.3726196289,51.4556777701),
new THREE.Vector2(-67.8105163574,51.4556777701),
new THREE.Vector2(-67.8105163574,65.1771743521),
new THREE.Vector2(-81.3726196289,65.1771743521)
];
linePoints105 = [
new THREE.Vector2(-81.3726196289,37.7341506705),
new THREE.Vector2(-67.8105163574,37.7341506705),
new THREE.Vector2(-67.8105163574,51.4556777701),
new THREE.Vector2(-81.3726196289,51.4556777701)
];
linePoints106 = [
new THREE.Vector2(-81.3726196289,24.0126540885),
new THREE.Vector2(-67.8105163574,24.0126540885),
new THREE.Vector2(-67.8105163574,37.7341506705),
new THREE.Vector2(-81.3726196289,37.7341506705)
];
linePoints107 = [
new THREE.Vector2(-81.3726196289,10.2911269888),
new THREE.Vector2(-67.8105163574,10.2911269888),
new THREE.Vector2(-67.8105163574,24.0126540885),
new THREE.Vector2(-81.3726196289,24.0126540885)
];
linePoints108 = [
new THREE.Vector2(-81.3726196289,-3.43036959319),
new THREE.Vector2(-67.8105163574,-3.43036959319),
new THREE.Vector2(-67.8105163574,10.2911269888),
new THREE.Vector2(-81.3726196289,10.2911269888)
];
linePoints109 = [
new THREE.Vector2(-81.3726196289,-17.1518814340),
new THREE.Vector2(-67.8105163574,-17.1518814340),
new THREE.Vector2(-67.8105163574,-3.43036959319),
new THREE.Vector2(-81.3726196289,-3.43036959319)
];
linePoints110 = [
new THREE.Vector2(-81.3726196289,-30.8733932748),
new THREE.Vector2(-67.8105163574,-30.8733932748),
new THREE.Vector2(-67.8105163574,-17.1518814340),
new THREE.Vector2(-81.3726196289,-17.1518814340)
];
linePoints111 = [
new THREE.Vector2(-81.3726196289,-44.5949013009),
new THREE.Vector2(-67.8105163574,-44.5949013009),
new THREE.Vector2(-67.8105163574,-30.8733932748),
new THREE.Vector2(-81.3726196289,-30.8733932748)
];


var shapeIndex = [linePoints0,linePoints1,linePoints2,linePoints3,linePoints4,linePoints5,linePoints6,linePoints7,linePoints8,linePoints9,linePoints10,linePoints11,linePoints12,linePoints13,linePoints14,linePoints15,linePoints16,linePoints17,linePoints18,linePoints19,linePoints20,linePoints21,linePoints22,linePoints23,linePoints24,linePoints25,linePoints26,linePoints27,linePoints28,linePoints29,linePoints30,linePoints31,linePoints32,linePoints33,linePoints34,linePoints35,linePoints36,linePoints37,linePoints38,linePoints39,linePoints40,linePoints41,linePoints42,linePoints43,linePoints44,linePoints45,linePoints46,linePoints47,linePoints48,linePoints49,linePoints50,linePoints51,linePoints52,linePoints53,linePoints54,linePoints55,linePoints56,linePoints57,linePoints58,linePoints59,linePoints60,linePoints61,linePoints62,linePoints63,linePoints64,linePoints65,linePoints66,linePoints67,linePoints68,linePoints69,linePoints70,linePoints71,linePoints72,linePoints73,linePoints74,linePoints75,linePoints76,linePoints77,linePoints78,linePoints79,linePoints80,linePoints81,linePoints82,linePoints83,linePoints84,linePoints85,linePoints86,linePoints87,linePoints88,linePoints89,linePoints90,linePoints91,linePoints92,linePoints93,linePoints94,linePoints95,linePoints96,linePoints97,linePoints98,linePoints99,linePoints100,linePoints101,linePoints102,linePoints103,linePoints104,linePoints105,linePoints106,linePoints107,linePoints108,linePoints109,linePoints110,linePoints111];


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//.AOS CAD-file reader
// var groupShapes = new THREE.Object3D();
// var groupShapes = new THREE.Group();
//
// for (i = 0 ; i < shapeIndex.length; i++){
// currentData = shapeIndex[i];
// shape = new THREE.Shape(currentData);
// shape.autoClose = true; // the shape will be closed automatically, thus we don't need to put the fifth point
// geometry = shape.createPointsGeometry();
// line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: "white"}));
// planarSrf = new THREE.ShapeGeometry(shape);
// smartGridMat = new THREE.MeshBasicMaterial({color:0xf2f2f2,wireframe:false,transparent:true,opacity:0});
// createMesh = new THREE.Mesh(planarSrf,smartGridMat);
// createMesh.doubleSided = true;
// groupShapes.add(createMesh);
// }//end gridcell loop generation
// scene.add(groupShapes);
// groupShapes.rotateOnAxis(new THREE.Vector3(1,0,0),- Math.PI / 2);
//MESH LIBRARY//////////////////////////////////////////////////////////////


var openPlanGridImport = [
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
  new THREE.Vector3(81.37,0.0,-65.18),
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
  new THREE.Vector3(81.37,0.0,-59.69),
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
  new THREE.Vector3(81.37,0.0,-54.2),
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
  new THREE.Vector3(81.37,0.0,-48.71),
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
  new THREE.Vector3(81.37,0.0,-43.22),
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
  new THREE.Vector3(81.37,0.0,-37.73),
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
  new THREE.Vector3(37.97,0.0,-32.25),
  new THREE.Vector3(43.4,0.0,-32.25),
  new THREE.Vector3(48.82,0.0,-32.25),
  new THREE.Vector3(54.25,0.0,-32.25),
  new THREE.Vector3(59.67,0.0,-32.25),
  new THREE.Vector3(65.1,0.0,-32.25),
  new THREE.Vector3(70.52,0.0,-32.25),
  new THREE.Vector3(75.95,0.0,-32.25),
  new THREE.Vector3(81.37,0.0,-32.25),
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
  new THREE.Vector3(37.97,0.0,-26.76),
  new THREE.Vector3(43.4,0.0,-26.76),
  new THREE.Vector3(48.82,0.0,-26.76),
  new THREE.Vector3(54.25,0.0,-26.76),
  new THREE.Vector3(59.67,0.0,-26.76),
  new THREE.Vector3(65.1,0.0,-26.76),
  new THREE.Vector3(70.52,0.0,-26.76),
  new THREE.Vector3(75.95,0.0,-26.76),
  new THREE.Vector3(81.37,0.0,-26.76),
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
  new THREE.Vector3(37.97,0.0,-21.27),
  new THREE.Vector3(43.4,0.0,-21.27),
  new THREE.Vector3(48.82,0.0,-21.27),
  new THREE.Vector3(54.25,0.0,-21.27),
  new THREE.Vector3(59.67,0.0,-21.27),
  new THREE.Vector3(65.1,0.0,-21.27),
  new THREE.Vector3(70.52,0.0,-21.27),
  new THREE.Vector3(75.95,0.0,-21.27),
  new THREE.Vector3(81.37,0.0,-21.27),
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
  new THREE.Vector3(37.97,0.0,-15.78),
  new THREE.Vector3(43.4,0.0,-15.78),
  new THREE.Vector3(48.82,0.0,-15.78),
  new THREE.Vector3(54.25,0.0,-15.78),
  new THREE.Vector3(59.67,0.0,-15.78),
  new THREE.Vector3(65.1,0.0,-15.78),
  new THREE.Vector3(70.52,0.0,-15.78),
  new THREE.Vector3(75.95,0.0,-15.78),
  new THREE.Vector3(81.37,0.0,-15.78),
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
  new THREE.Vector3(37.97,0.0,-10.29),
  new THREE.Vector3(43.4,0.0,-10.29),
  new THREE.Vector3(48.82,0.0,-10.29),
  new THREE.Vector3(54.25,0.0,-10.29),
  new THREE.Vector3(59.67,0.0,-10.29),
  new THREE.Vector3(65.1,0.0,-10.29),
  new THREE.Vector3(70.52,0.0,-10.29),
  new THREE.Vector3(75.95,0.0,-10.29),
  new THREE.Vector3(81.37,0.0,-10.29),
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
  new THREE.Vector3(37.97,0.0,-4.8),
  new THREE.Vector3(43.4,0.0,-4.8),
  new THREE.Vector3(48.82,0.0,-4.8),
  new THREE.Vector3(54.25,0.0,-4.8),
  new THREE.Vector3(59.67,0.0,-4.8),
  new THREE.Vector3(65.1,0.0,-4.8),
  new THREE.Vector3(70.52,0.0,-4.8),
  new THREE.Vector3(75.95,0.0,-4.8),
  new THREE.Vector3(81.37,0.0,-4.8),
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
  new THREE.Vector3(81.37,0.0,0.69),
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
  new THREE.Vector3(81.37,0.0,6.17),
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
  new THREE.Vector3(81.37,0.0,11.66),
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
  new THREE.Vector3(81.37,0.0,17.15),
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
  new THREE.Vector3(81.37,0.0,22.64),
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
  new THREE.Vector3(81.37,0.0,28.13),
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
  new THREE.Vector3(81.37,0.0,33.62),
  new THREE.Vector3(-81.37,0.0,39.11),
  new THREE.Vector3(-75.95,0.0,39.11),
  new THREE.Vector3(-70.52,0.0,39.11),
  new THREE.Vector3(37.97,0.0,39.11),
  new THREE.Vector3(43.4,0.0,39.11),
  new THREE.Vector3(48.82,0.0,39.11),
  new THREE.Vector3(54.25,0.0,39.11),
  new THREE.Vector3(59.67,0.0,39.11),
  new THREE.Vector3(65.1,0.0,39.11),
  new THREE.Vector3(70.52,0.0,39.11),
  new THREE.Vector3(75.95,0.0,39.11),
  new THREE.Vector3(81.37,0.0,39.11),
  new THREE.Vector3(-81.37,0.0,44.59),
  new THREE.Vector3(-75.95,0.0,44.59),
  new THREE.Vector3(-70.52,0.0,44.59),
  new THREE.Vector3(37.97,0.0,44.59),
  new THREE.Vector3(43.4,0.0,44.59),
  new THREE.Vector3(48.82,0.0,44.59),
  new THREE.Vector3(54.25,0.0,44.59),
  new THREE.Vector3(59.67,0.0,44.59),
  new THREE.Vector3(65.1,0.0,44.59),
  new THREE.Vector3(70.52,0.0,44.59),
  new THREE.Vector3(75.95,0.0,44.59),
  new THREE.Vector3(81.37,0.0,44.59),
  new THREE.Vector3(37.97,0.0,50.08),
  new THREE.Vector3(43.4,0.0,50.08),
  new THREE.Vector3(48.82,0.0,50.08),
  new THREE.Vector3(54.25,0.0,50.08),
  new THREE.Vector3(59.67,0.0,50.08),
  new THREE.Vector3(65.1,0.0,50.08),
  new THREE.Vector3(70.52,0.0,50.08),
  new THREE.Vector3(75.95,0.0,50.08),
  new THREE.Vector3(81.37,0.0,50.08),
  new THREE.Vector3(37.97,0.0,55.57),
  new THREE.Vector3(43.4,0.0,55.57),
  new THREE.Vector3(48.82,0.0,55.57),
  new THREE.Vector3(54.25,0.0,55.57),
  new THREE.Vector3(59.67,0.0,55.57),
  new THREE.Vector3(65.1,0.0,55.57),
  new THREE.Vector3(70.52,0.0,55.57),
  new THREE.Vector3(75.95,0.0,55.57),
  new THREE.Vector3(81.37,0.0,55.57),
  new THREE.Vector3(37.97,0.0,61.06),
  new THREE.Vector3(43.4,0.0,61.06),
  new THREE.Vector3(48.82,0.0,61.06),
  new THREE.Vector3(54.25,0.0,61.06),
  new THREE.Vector3(59.67,0.0,61.06),
  new THREE.Vector3(65.1,0.0,61.06),
  new THREE.Vector3(70.52,0.0,61.06),
  new THREE.Vector3(75.95,0.0,61.06),
  new THREE.Vector3(81.37,0.0,61.06),
]




var ptDefaultMaterial = new THREE.PointsMaterial({color: "green"});

var openPlanGridPts = [];

for(i=0;i<openPlanGridImport.length;i++){
  geometry = new THREE.Geometry();
  geometry.vertices.push(openPlanGridImport[i]);
  point = new THREE.Points(geometry, ptDefaultMaterial);
  openPlanGridPts.push(point);
  scene.add(point);

}
