//Andrew.js

var camera, scene, controls, renderer;

scene = new THREE.Scene()
scene.background = new THREE.Color( 0x000000 ); //0xf0f0f0

viewport = document.getElementById('areaoscanvas');

h = viewport.offsetHeight;
w = viewport.offsetWidth;

var aspect = window.innerWidth / window.innerHeight;

frustumSize = 150;
camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -5000, 5000 );

renderer = new THREE.WebGLRenderer({antialias:true, alpha: true, autoClear: false, fullScreen: true});

////////////////////////don't worry about the above


function test(variable1){
  varPlus10 = add10(variable1);
  console.log(varPlus10);
  console.log("this is coming from test",duck);
}

function add10(a){
  console.log("running");
  var duck = 200;
  console.log(">>>>>>>>",duck);
  return(a+10);
}

var duck = 100;//
function newFunc(){
  console.log("this is new func",duck);
}

test(15);
newFunc();

var myFirstObject = {
  a: 5,
  b: 10,
};

console.log("XXXXXXXXXXXXXX",myFirstObject.a);

var myList = [15,25,36];

for(i=0;i<myList.length;i++){
  console.log(myList[i]);
  if(myList[i]<20){
    console.log("!!!");
  }
}
