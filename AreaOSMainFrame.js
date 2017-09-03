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
    camera.position.y = 250;
    camera.lookAt(new THREE.Vector3(0,0,0));
    window.addEventListener( 'resize', onWindowResize, false );
  }
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    render();
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
    disableOrbitCam(); //keeps orbit click lock need to fix!
    camera.position.y = 250;
    camera.position.x = 0;
    camera.position.z = 0;
    camera.lookAt(new THREE.Vector3(0,0,0));
    enableOrbitCam();
  }
  function zoom(value){
    if(value == 0){
      // camera.position =
    }else{
      // camera.position =
    }
  }
  function orbitCam(){
    controls = new THREE.OrbitControls( camera,renderer.domElement );
    controls.enableZoom = true;
    controls.enableKeys = false;
    controls.maxPolarAngle = Math.PI/2;
    controls.addEventListener( 'change', render );
  }
  var questionDialog = document.getElementById('questionDialog');
  questionDialog.addEventListener('mousemove',disableOrbitCam);
  questionDialog.addEventListener('touchstart',disableOrbitCam);
  var topInput = document.getElementById('topInput');
  topInput.addEventListener('mousemove',disableOrbitCam);
  topInput.addEventListener('touchstart',disableOrbitCam);

  function disableOrbitCam(){
    controls.enabled = false
    function hideCamIcons(){
      var camIcons = document.getElementsByClassName('icons');
      for (i = 0; i < camIcons.length; i++){
        camIcons[i].style.transition = "opacity 2s";
        camIcons[i].style.opacity = 0;
      }
      function offCamIcons(){
        for (i = 0; i < camIcons.length; i++){
          if (camIcons[i].style.opacity == 0){
            camIcons[i].style.visibility = 'hidden';
          }
        }
      }
      setTimeout(offCamIcons, 1000);
    }
    hideCamIcons();
  }
  function enableOrbitCam(){
    controls.enabled = true
    //document.getElementById('camautobutton').click();
    function showCamIcons(){
      var camIcons = document.getElementsByClassName('icons');
      for (i = 0; i < camIcons.length; i++){
        camIcons[i].style.visibility = 'visible';
      }
      for (i = 0; i < camIcons.length; i++){
        camIcons[i].style.transition = "opacity 2s";
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
      var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
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
      var material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
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
     var siteColumnsMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: false, transparent: true} );
     siteColumnsMesh = new THREE.Mesh(geometry,siteColumnsMaterial);
     scene.add(siteColumnsMesh);
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
     var siteWallsMaterial = new THREE.MeshLambertMaterial( { color: 0xf2f2f2, emissive: 0xf2f2f2, emissiveIntensity: 1} );
     siteWallsMesh = new THREE.Mesh(geometry,siteWallsMaterial);
     scene.add(siteWallsMesh);
     renderer.render(scene,camera);

     var wallOutline = new THREE.Geometry();
     wallOutline.copy(siteWallsGeo);
     wallOutline.mergeVertices();
     highlightEdges(wallOutline);
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
     var siteSectionMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: false, transparent: true} );
     siteSectionMesh = new THREE.Mesh(geometry,siteSectionMaterial);
     scene.add(siteSectionMesh);
     renderer.render(scene,camera);
   }
  );
  //siteFacade
  var siteSectionLoader = new THREE.JSONLoader();
  var siteSectionMesh = null;
  var siteSectionGeo = null;
  siteSectionLoader.load(
    'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/facade.json',
   function ( geometry, materials ) {
     siteSectionGeo = geometry;
     var siteSectionMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff, wireframe: false, transparent: true} );
     siteSectionMesh = new THREE.Mesh(geometry,siteSectionMaterial);
     scene.add(siteSectionMesh);
     renderer.render(scene,camera);
   }
  );
  //siteOutline
  var siteOutlineLoader = new THREE.JSONLoader();
  var siteOutlineMesh = null;
  var siteOutlineGeo = null;
  siteOutlineLoader.load(
    'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/siteOutline.json',
   function ( geometry, materials ) {
     siteOutlineGeo = geometry;
     highlightEdges(siteOutlineGeo);
   }
  );
  function highlightEdges(outlineThis){
    var eGeometry = new THREE.EdgesGeometry(outlineThis);
    var eMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 1 });
    var edges = new THREE.LineSegments(eGeometry,eMaterial);
    scene.add(edges);
    renderer.render(scene, camera);
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
  var groupShapes = new THREE.Group();

  for (i = 0 ; i < shapeIndex.length; i++){
    currentData = shapeIndex[i];
    shape = new THREE.Shape(currentData);
    shape.autoClose = true; // the shape will be closed automatically, thus we don't need to put the fifth point
    geometry = shape.createPointsGeometry();
    line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: "white"}));
    planarSrf = new THREE.ShapeGeometry(shape);
    // planarSrf.rotateX( - Math.PI / 2 );
    smartGridMat = new THREE.MeshBasicMaterial({color:0xf2f2f2,wireframe:false,transparent:false,opacity:1});
    createMesh = new THREE.Mesh(planarSrf,smartGridMat);
    createMesh.doubleSided = true;
    groupShapes.add(createMesh);
  }//end gridcell loop generation
  scene.add(groupShapes);
  groupShapes.rotateOnAxis(new THREE.Vector3(1,0,0),- Math.PI / 2);


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
    alert(areaRequest);

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

  // FORMS
  function formSubmit(x,z){
    if (x == 0){
      addDialog(x,z);
    };
    if (x == 1){
      var usqi = document.getElementById("inputSQFT").value;
      addDialog(x,usqi);
      leaseIgnition(usqi);
    };
    if (x == 2){
      addDialog(x,z);
    };
    if (x == 3){
      addDialog(x,z);
    };
  };
  function addDialog(x,z){
    if (x == 0){
      var q0Place = ["Tribeca","Chelsea","LES","Hell's Kitchen","Midtown","Williamsburg","Bed-Stuy","Green Point"];
      document.getElementById("Q0Output").innerHTML = "In " + '<a onclick="revealQ(0)"><u>' + q0Place[z] + '</u></a>' + " I need ";
      stowAwayQ(x);
      animate(); // spin chairMesh
      //var numFaces = siteMesh.faces.length;
      //explodeSite();
    };
    if (x == 1){
      document.getElementById("Q1Output").innerHTML = '<a onclick="revealQ(1)"><u>' + (z + "SQFT") + '</u></a>' + " for ";
      event.preventDefault();
      hideKeyboard();
      stowAwayQ(x);
    };
    if (x == 2){
      var q2Verb = ["crafting things","presenting things","analyzing things","writing things","doing things"];
      document.getElementById("Q2Output").innerHTML = '<a onclick="revealQ(2)"><u>' + q2Verb[z] + '</u></a>' + " with";
      stowAwayQ(x);
    };
    if (x == 3){
      var q3Team = ["just myself.","two to four people.","five to ten people.","eleven to twenty people."];
      document.getElementById("Q3Output").innerHTML = '<a onclick="revealQ(3)"><u>' + q3Team[z] + '</u></a>';
      stowAwayQ(x);
    };
  };
  function stowAwayQ(x){
    var hideThisQ = document.getElementById("Q"+x);
    hideThisQ.style.display = 'none';
    x = x+1;
    revealQ(x);
  };
  function revealQ(x){
    qSelectIndex = "Q"+x;
    var showThisQ = document.getElementById(qSelectIndex);
    showThisQ.style.display = '';
  };
  var hideKeyboard = function() {
    document.activeElement.blur();
    $("input").blur();
  };
