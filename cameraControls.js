let camera, controls;

camera = new THREE.OrthographicCamera( window.innerWidth / - 50, window.innerWidth / 50, window.innerHeight / 50, window.innerHeight / -50, - 500, 1000);
camera.position.z = 50;
camera.position.y = 40;
camera.position.x = 130;

//Default camera on user click

// function returnCamAxon(){   camera.position.y = 200;   camera.position.x = -200;   camera.position.z = -200;   controls.target.set(0,0,0); }

controls = new THREE.OrbitControls( camera );
controls.enableZoom = true;   controls.enableKeys = false;   controls.maxPolarAngle = Math.PI/2 ; 