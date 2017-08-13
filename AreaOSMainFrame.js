//SCENE AND CONTROLS////////////////////////////////////////////////////////////
  alert("newnew");
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
    camera.position.y = 250;
    camera.lookAt(new THREE.Vector3(0,0,0));
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
  var siteLoader = new THREE.JSONLoader();
  var siteMesh = null;
  var siteGeo = null;
  siteLoader.load(
    'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/siteOutline.json',
   function ( geometry, materials ) {
     siteGeo = geometry;
     var siteMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 , wireframe: true, transparent: true} );
     siteMesh = new THREE.Mesh(geometry,siteMaterial);
     scene.add(siteMesh);
     renderer.render(scene,camera);
     //highlightEdges(siteGeo);
   }
  );
  function highlightEdges(outlineThis){
    var eGeometry = new THREE.EdgesGeometry(outlineThis);
    var eMaterial = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 1 });
    var edges = new THREE.LineSegments(eGeometry,eMaterial);
    scene.add(edges);
    renderer.render(scene, camera);
  }
  //siteOutline
  var siteOutlineLoader = new THREE.JSONLoader();
  var siteOutlineMesh = null;
  var siteOutlineGeo = null;
  siteOutlineLoader.load(
    'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/siteOutline.json',
   function ( geometry, materials ) {
     siteOutlineGeo = geometry;
     var siteOutlineMaterial = new THREE.MeshBasicMaterial( { color: 0xf2f2f2, wireframe: false, transparent: true} );
     siteOutlineMesh = new THREE.Mesh(geometry,siteOutlineMaterial);
     scene.add(siteOutlineMesh);
     renderer.render(scene,camera);
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
  //explode site
//   function explodeSite(){
//     //alert(explodeThis);
//     var explodeModifier = new THREE.ExplodeModifier();
// //      explodeModifier.modify(siteMesh);
//     //explodeModifier.modify(siteGeo);
//     mat = new THREE.MeshBasicMaterial({color: 0x000000});
//     var testt = siteGeo.faces[9].clone()
//     var numFaces = new THREE.Mesh(testt,mat);
//     scene.add(numFaces);
//     renderer.render(scene,camera);
//     //clone
//     //alert(numFaces);
//   };
  //site//
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  function formSubmit(x,z){
    if (x == 0){
      addDialog(x,z);
    };
    if (x == 1){
      var usqi = document.getElementById("inputSQFT").value;
      addDialog(x,usqi);
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
