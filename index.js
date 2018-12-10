let clock = new THREE.Clock();
let scene, renderer, particle1, particle2,light, spotlight, object, lightHelper;

init();
animate();

function init() {
  //Create scene and Orthographic camera
  scene = new THREE.Scene();
  
  renderer = new THREE.WebGLRenderer();
 
  
  //Turn on shadows in the renderer
  renderer.shadowMap.enabled = true;
  //Set renderer size
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  document.body.appendChild(renderer.domElement);
  //#A material for shiny surfaces with specular highlights.
  planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xCCCCCC
  });
  planeGeometry = new THREE.PlaneGeometry(300, 300);

  floor = new THREE.Mesh(planeGeometry, planeMaterial);

  floor.rotation.x = -0.5 * Math.PI;
  floor.position.z = 0;
  floor.position.y = 0;
  floor.position.x = 15;
  floor.receiveShadow = true;
  scene.add(floor);
  
  //Create polygon with shading
  boxGeometry = new THREE.IcosahedronGeometry(4, 1);
  boxMaterial = new THREE.MeshPhongMaterial({
    color: 0x99FFFF,
    shading: THREE.FlatShading
  });
  cube = new THREE.Mesh(boxGeometry, boxMaterial);
  cube.castShadow = true;
  cube.position.x = -4;
  cube.position.y = 5;
  cube.position.z = 0;
  scene.add(cube);

  camera.lookAt(cube.position);

 
  //Add extra ambient light tot he scene
  let ambiColor = "#1c1c1c";
  ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);
  
  sphere = new THREE.SphereGeometry(0.5, 16, 8);

  light = new THREE.PointLight(0xFFFFFF, 1, 100);
  light.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    color: 0xffffff
  })));
  light.position.set(-10, 10, 0);
  light.castShadow = true;
  scene.add(light);


  spotlight = new THREE.SpotLight(0xFFFFFF, 1, 1300);
  spotlight.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({
    color: 0xffffff
  })));

  spotlight.position.set(-30, 30, 0);
  spotlight.castShadow = true;
  spotlight.angle = Math.PI / 3;
  spotlight.penumbra = 0.55;
  spotlight.decay = 2;
  spotlight.distance = 50;
  spotlight.shadow.mapSize.width = 2024;
  spotlight.shadow.mapSize.height = 2024;
  spotlight.shadow.camera.near = 1;
  spotlight.shadow.camera.far = 200;
  scene.add(spotlight);

  lightHelper = new THREE.SpotLightHelper(spotlight);
}

//Animate scene
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  let time = Date.now() * 0.0005;
  let delta = clock.getDelta();
  //if (object) object.rotation.y -= 0.5 * delta;
  light.position.x = Math.sin(time * 0.5) * 10;
  light.position.y = Math.cos(time * 0) * 10;
  light.position.z = Math.cos(time * 0.5) * 10;

    // Set object rotation controls here
    //   cube.rotation.x += 0.02;
    //   cube.rotation.y += 0.02;

  lightHelper.update(); // required
  renderer.render(scene, camera);

}