// instantiate a loader
var loader = new THREE.OBJLoader();

// load a resource
loader.load(
	// resource URL
	'https://raw.githubusercontent.com/jojoghaida/AREA-OS_JSON/master/test.obj',
	// called when resource is loaded
	function ( object ) {
		var texture = new THREE.Texture();

		console.log(object)
		scene.add( object );

	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);