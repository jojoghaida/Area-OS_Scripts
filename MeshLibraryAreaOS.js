//MESH LIBRARY//////////////////////////////////////////////////////////////
var thisSite = new THREE.Group();

// fonts
fontKarla_Reg = undefined;
function loadKarla(){
  var loader = new THREE.FontLoader();
  				loader.load("https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/5dd63395077414af139378bb31fb7f05cc471884/Karla_Regular.json", function ( response ) {
  					fontKarla_Reg = response;} );
}
loadKarla();

var loadFurnitureFamilies = function(){
  q = (loaderQue - loadBasicsList.length)*-1;
  style = loaderBasicsVars[q][0];//
  link = loaderBasicsVars[q][1];//
  loader = new THREE.JSONLoader();
  group = new THREE.Group();
  group.name = style.name;
  loader.load(
    link,
    function (geometry) {
      material = new THREE.MeshBasicMaterial( { color: 0x0092ff } );
      mesh = new THREE.Mesh(geometry,style.styles.mesh);
      lines = highlightEdges(mesh.geometry,.1,style.styles.line.color);
      group.add(mesh,lines);
      group.userData = JSON.parse(JSON.stringify(style.metaData)); //need to clone metaData so as to store style object within element without causing circular paths.
      group.userData.defaultStyle = style.styles;
      loaderQue--;//
      if(loaderQue!=0){loadFurnitureFamilies();}else{
        setLoadedFurniture();
      }//
    });
    // return(group);
    loadBasicsList[q] = group;
}

var chairMesh,DeskBasic,table;
function setLoadedFurniture(){
  chairMesh = loadBasicsList[0];
  DeskBasic = loadBasicsList[1];
  table = loadBasicsList[2];
}
var loadBasicsList = [chairMesh,DeskBasic,table];
var loaderBasicsVars = [
  [metaBasicChair,'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/basicChair.json'],
  [metaBasicDesk,'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/desk.json'],
  [metaBasicTable,'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/basicConferenceTable4to6.json'],
]
var loaderQue = loadBasicsList.length;
loadFurnitureFamilies();

// chairMesh = loadFurnitureFamily(
//   metaBasicChair,'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/basicChair.json');
//
// setTimeout(function(){
//   DeskBasic = loadFurnitureFamily(metaBasicDesk,'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/desk.json')
// },1000);
//
// setTimeout(function(){
//   table = loadFurnitureFamily(metaBasicTable,'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/basicConferenceTable4to6.json')
// },1500);

var typWorkBasicGroup = new THREE.Group();

function conTypWorkBasicGroup(){
  desk = DeskBasic.clone();
  chair = chairMesh.clone();
  desk.position.x = 1.34;
  chair.rotation.y = -Math.PI;
  chair.position.x = 4;
  typWorkBasicGroup.add(desk,chair);
  typWorkBasicGroup.userData = metaWorkStool.metaData;
}
setTimeout(function () {
  conTypWorkBasicGroup();
}, 4000);

var typConferenceGroup = new THREE.Group();
// typConferenceGroup.name = "Conference Table & Chairs";
// typConferenceGroup.userData.elementType = "FurnitureSet";
// typConferenceGroup.userData.elementName = "DeskW/Chair";

function conTypConferenceGroup(){
  table = table.clone();
  typConferenceGroup.add(table);

  chairPos = [
    one = {
      pos: new THREE.Vector3(0,0,-4.63),
      rot: -Math.PI/2
    },
    two = {
      pos: new THREE.Vector3(-2.88,0,-1.62),
      rot: 0
    },
    three = {
      pos: new THREE.Vector3(-2.88,0,1.62),
      rot: 0
    },
    four = {
      pos: new THREE.Vector3(0,0,4.63),
      rot: Math.PI/2
    },
    five = {
      pos: new THREE.Vector3(2.88,0,1.62),
      rot: -Math.PI
    },
    six = {
      pos: new THREE.Vector3(2.88,0,-1.62),
      rot: -Math.PI
    },
  ];

  for(i=0;i<chairPos.length;i++){
    chair = chairMesh.clone();
    chair.position.x = chairPos[i].pos.x;
    chair.position.z = chairPos[i].pos.z;
    chair.rotation.y = chairPos[i].rot;
    //
    typConferenceGroup.add(chair);
  }
  typConferenceGroup.userData = metaConferenceTable.metaData;

}
setTimeout(function () {
  conTypConferenceGroup();
}, 3000);

function outline3D(geo){
  mat = new THREE.MeshBasicMaterial({color: "red", side: THREE.BackSide});
  backSide3D = new THREE.Mesh(geo, mat);
  backSide3D.scale.multiplyScalar(1.05);
  return(backSide3D);
}
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
 // outlinedCol = outline3D(siteColumnsMesh.geometry.clone());
  // thisSite.add(siteColumnsMesh,outlinedCol);
  thisSite.add(siteColumnsMesh);
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
      thisSite.add(siteSlabMesh);
      lowerFloors(siteSlabMesh);
  }
);

var slabLight = new THREE.DirectionalLight( 0xffffff );
slabLight.position.set( 0, 1, .5 ).normalize();
slabLight.castShadow = true;
scene.add(slabLight);

var siteSlabPhongLoader = new THREE.JSONLoader();
var siteSlabPhongMesh = null;
var siteSlabPhongGeo = null;
siteSlabPhongLoader.load(
  'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/eb383d3afb11d6184d1b9ea9f45a62c2b9a27e04/slabPhong.json',
  function(geometry, materials){
      siteSlabPhongGeo = geometry;
      var siteSlabPhongMaterial = new THREE.MeshPhongMaterial({color: "white", shininess: 0, reflectivity: 0, side: THREE.DoubleSide});
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
 var siteEgressMaterial = new THREE.MeshBasicMaterial({color: "white" /*0xFFEB00*/, wireframe: false, transparent: true, opacity: 1, side: THREE.DoubleSide});
 siteEgressMesh = new THREE.Mesh(geometry,siteEgressMaterial);
 thisSite.add(siteEgressMesh);
 var egressOutline = new THREE.Geometry();
 egressOutline.copy(siteEgressGeo);
 egressOutline.mergeVertices();
 thisSite.add(highlightEdges(egressOutline,.1,"black"/*0xad9f00*/));
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
 thisSite.add(siteWallsMesh);
 lowerFloors(siteWallsMesh);

 var wallOutline = new THREE.Geometry();
 wallOutline.copy(siteWallsGeo);
 wallOutline.mergeVertices();
 var outLinedOfWalls = highlightEdges(wallOutline);
 thisSite.add(outLinedOfWalls);
 lowerFloors(outLinedOfWalls,.15);
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
 thisSite.add(siteSectionMesh);
 scene.add(highlightEdges(siteSectionGeo,.5));
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
 var siteSectionMaterial = new THREE.MeshBasicMaterial( { color: 0x606060, wireframe: false, transparent: true} );
 siteFacadeMesh = new THREE.Mesh(geometry,siteSectionMaterial);
 thisSite.add(siteFacadeMesh);
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
 thisSite.add(siteGlazingMesh);
 lowerFloors(siteGlazingMesh);
}
);

function highlightEdges(outlineThis, lineW = .2, color = "black"){
  var eGeometry = new THREE.EdgesGeometry(outlineThis);
  var eMaterial = new THREE.LineBasicMaterial({ color: color, linewidth: lineW, transparent: true });
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

setTimeout(function(){scene.add(thisSite)},2000);



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//floor 3 layout
  //Work Stool
var layoutPts = [
   new THREE.Vector3(0,0,0),
   new THREE.Vector3(-85.0871209820751,0,37.0583272135598),
   new THREE.Vector3(-85.0871209820752,0,31.9333272135598),
   new THREE.Vector3(-85.0871209820752,0,26.8083272135598),
   new THREE.Vector3(-85.0871209820752,0,21.6833272135597),
   new THREE.Vector3(-70.7349583252511,0,44.1583738305845),
   new THREE.Vector3(-75.8599583252512,0,44.1583738305845),
   new THREE.Vector3(-72.5192123990125,0,44.6583738305844),
   new THREE.Vector3(-77.6442123990125,0,44.6583738305845),
   new THREE.Vector3(-82.7692123990125,0,44.6583738305845),
   new THREE.Vector3(-35.4307374002352,0,-2.08695202819455),
   new THREE.Vector3(-39.0546596538163,0,1.53697022538654),
   new THREE.Vector3(-42.6785819073974,0,5.16089247896763),
   new THREE.Vector3(-46.3025041609784,0,8.78481473254872),
   new THREE.Vector3(-46.3025041609784,0,8.78481473254873),
   new THREE.Vector3(-42.6785819073973,0,5.16089247896765),
   new THREE.Vector3(-39.0546596538163,0,1.53697022538658),
   new THREE.Vector3(-35.4307374002352,0,-2.0869520281945),
   new THREE.Vector3(20.6580202736674,0,23.4895214711051),
   new THREE.Vector3(17.0340980200863,0,27.1134437246862),
   new THREE.Vector3(13.4101757665053,0,30.7373659782672),
   new THREE.Vector3(9.78625351292418,0,34.3612882318483),
   new THREE.Vector3(9.78625351292418,0,34.3612882318483),
   new THREE.Vector3(13.4101757665053,0,30.7373659782672),
   new THREE.Vector3(17.0340980200863,0,27.1134437246861),
   new THREE.Vector3(20.6580202736674,0,23.489521471105),
   new THREE.Vector3(-5.58640423443772,0,31.0362236797482),
   new THREE.Vector3(-10.7114042344378,0,31.0362236797482),
   new THREE.Vector3(-15.8364042344378,0,31.0362236797482),
   new THREE.Vector3(-20.9614042344378,0,31.0362236797482),
   new THREE.Vector3(-20.9614042344378,0,31.0362236797482),
   new THREE.Vector3(-15.8364042344378,0,31.0362236797482),
   new THREE.Vector3(-10.7114042344377,0,31.0362236797482),
   new THREE.Vector3(-5.58640423443771,0,31.0362236797482),
   new THREE.Vector3(-5.32907051820075E-15,0,-5.12500000000004),
   new THREE.Vector3(0,0,0),
   new THREE.Vector3(2.8421709430404E-14,0,5.12500000000003),
   new THREE.Vector3(2.8421709430404E-14,0,5.12500000000003),
   new THREE.Vector3(5.6843418860808E-14,0,10.2500000000001),
   new THREE.Vector3(5.6843418860808E-14,0,10.2500000000001),
];

var layoutVecs = [
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(0,0,1),
   new THREE.Vector3(0,0,1),
   new THREE.Vector3(0,0,-1),
   new THREE.Vector3(0,0,-1),
   new THREE.Vector3(0,0,-1),
   new THREE.Vector3(0.707106781186546,0,-0.707106781186549),
   new THREE.Vector3(0.707106781186547,0,-0.707106781186548),
   new THREE.Vector3(0.707106781186547,0,-0.707106781186548),
   new THREE.Vector3(0.707106781186547,0,-0.707106781186548),
   new THREE.Vector3(-0.70710678118655,0,0.707106781186545),
   new THREE.Vector3(-0.70710678118655,0,0.707106781186544),
   new THREE.Vector3(-0.70710678118655,0,0.707106781186545),
   new THREE.Vector3(-0.707106781186551,0,0.707106781186544),
   new THREE.Vector3(-0.707106781186551,0,0.707106781186544),
   new THREE.Vector3(-0.70710678118655,0,0.707106781186545),
   new THREE.Vector3(-0.70710678118655,0,0.707106781186544),
   new THREE.Vector3(-0.707106781186549,0,0.707106781186546),
   new THREE.Vector3(0.707106781186547,0,-0.707106781186548),
   new THREE.Vector3(0.707106781186547,0,-0.707106781186548),
   new THREE.Vector3(0.707106781186547,0,-0.707106781186548),
   new THREE.Vector3(0.707106781186546,0,-0.707106781186549),
   new THREE.Vector3(-4.48764047391658E-15,0,1),
   new THREE.Vector3(-2.99176031594438E-15,0,1),
   new THREE.Vector3(-3.36573035543743E-15,0,1),
   new THREE.Vector3(-2.99176031594438E-15,0,1),
   new THREE.Vector3(-1.49588015797219E-15,0,-1),
   new THREE.Vector3(-7.47940078986096E-16,0,-1),
   new THREE.Vector3(-1.49588015797219E-15,0,-1),
   new THREE.Vector3(-2.99176031594439E-15,0,-1),
   new THREE.Vector3(-1,0,-3.73970039493048E-15),
   new THREE.Vector3(-1,0,-3.36573035543743E-15),
   new THREE.Vector3(-1,0,-3.36573035543743E-15),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(-1,0,-3.36573035543743E-15),
   new THREE.Vector3(1,0,0),
];


  //Work Stool
  //Conference TableL
  var conferenceLayoutPts = [
   new THREE.Vector3(-69.1474193382572,0,29.7905756843282),
   new THREE.Vector3(-68.9229735246346,0,-51.0688106430911),
   new THREE.Vector3(-16.7857724225218,0,5.92327153330748),
   new THREE.Vector3(17.4094768833174,0,5.92327153330748),
   new THREE.Vector3(-77.2330973067781,0,75.3910991293863),
   new THREE.Vector3(60.8870755017496,0,95.4349784687038),
   new THREE.Vector3(47.5589732764076,0,95.1743836713723),
   new THREE.Vector3(34.2960197503985,0,95.4219487288373),
];

var conferenceLayoutVecs = [
   new THREE.Vector3(0.707106781186553,0,0.707106781186542),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(1,0,0),
   new THREE.Vector3(1,0,0),
];


  //Conference TableL
  /////////////
  floor3WorkDesks = layoutPts.length;
  floor3Conference = conferenceLayoutPts.length;

  setTimeout(function(){
    for(i=0; i<floor3WorkDesks; i++){
      a = dropSet(typWorkBasicGroup,layoutPts[i],layoutVecs[i]);
      a.name = 'Work Stool';
      // clickables.add(a);
    }
    for(i=0; i<floor3Conference; i++){
      a = dropSet(typConferenceGroup,conferenceLayoutPts[i],conferenceLayoutVecs[i]);
      a.name = 'Conference Table';
      // clickables.add(a);
      // if(i<3){
      //   var spritey = makeTextSprite( i, {backgroundColor: {r:58, g:211, b:234, a:1.0}});
      //   spritey.position.x = a.position.x;
      //   spritey.position.z = a.position.z;
      //   spritey.position.y = 12;
      // 	sprites.add( spritey );
      // }
    }
    // scene.add(clickables);
  },5000);
//floor 3 layout

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
