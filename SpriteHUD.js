//AREA OS HUD//

	// geometry = new THREE.Geometry();
	// geometry.vertices.push(new THREE.Vector3(0,15,0));
	// mat = new THREE.PointsMaterial({color: 'red'});
	// pointt = new THREE.Points(geometry,mat );
	// console.log(pointt);
	// scene.add(pointt);

	var spritey = makeTextSprite( "Group #1",
		{ fontsize: 24, borderColor: {r:0, g:0, b:0, a:1.0}, borderColor: {r:0, g:0, b:0, a:0.0}, backgroundColor: {r:255, g:255, b:255, a:1.0} } );
	spritey.position.set(0,10,0);
	scene.add( spritey );

	var spritey = makeTextSprite( " OS! ",
		{ fontsize: 24, fontface: "Karla", borderColor: {r:0, g:0, b:0, a:0.0} } );
	spritey.position.set(50,0,0);
	scene.add( spritey );

function makeTextSprite( message, parameters )
{
    if ( parameters === undefined ) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ?
        parameters["fontface"] : "Karla";

    var fontsize = parameters.hasOwnProperty("fontsize") ?
        parameters["fontsize"] : 100;

    var borderThickness = parameters.hasOwnProperty("borderThickness") ?
        parameters["borderThickness"] : 4;

    var borderColor = parameters.hasOwnProperty("borderColor") ?
        parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
        parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

    // if (old) {
    //   var spriteAlignment = THREE.SpriteAlignment.topLeft;
    // }

    var canvas = document.createElement('canvas');

	  //
	  var size = 500;
	  canvas.width = size;
	  canvas.height = size;
		var context = canvas.getContext('2d');
		context.textAlign = "center";
	  context.fillStyle = "white";
		var metrics = context.measureText( message );
    var textWidth = metrics.width;
		console.log(textWidth);
		console.log(fontsize);
	  context.fillRect( 0, (size/2) - fontsize/2, size, fontsize + fontsize/2);
	  context.font = "Bold " + fontsize + "px " + fontface;

    // get size data (height depends only on font size)
		// canvas.width = textWidth;


    // background color
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                  + backgroundColor.b + "," + backgroundColor.a + ")";
    // border color
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                  + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    // 1.4 is extra height factor for text below baseline: g,j,p,q.

    // text color
    context.fillStyle = "rgba(0, 0, 0, 1.0)";

		// context.fillText( message, borderThickness, fontsize + borderThickness);
		context.fillText( message, size/2, size/2 + fontsize/2);

    console.log(canvas.width, canvas.height);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial({ map: texture});

    var sprite = new THREE.Sprite( spriteMaterial );
   	sprite.scale.set(10,10,1.0);
    return sprite;
}


function labelAxis(width, data, direction){

  var separator = 2*width/data.length,
            p = {
                x:0,
                y:0,
                z:0
            },
            dobj = new THREE.Object3D();

  for ( var i = 0; i < data.length; i ++ ) {
        var label = makeTextSprite(data[i]);

        label.position.set(p.x,p.y,p.z);

        dobj.add( label );
        if (direction=="y"){
            p[direction]+=separator;
        }else{
            p[direction]-=separator;
        }

  }
  return dobj;
}

// function for drawing rounded rectangles
function roundRect(ctx, x, y, w, h, r)
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}







//
//
// function makeTextSprite( message, parameters )
// {
// 	if ( parameters === undefined ) parameters = {};
//
// 	var fontface = parameters.hasOwnProperty("fontface") ?
// 		parameters["fontface"] : "Karla";
//
// 	var fontsize = parameters.hasOwnProperty("fontsize") ?
// 		parameters["fontsize"] : 18;
//
// 	var borderThickness = parameters.hasOwnProperty("borderThickness") ?
// 		parameters["borderThickness"] : 4;
//
// 	var borderColor = parameters.hasOwnProperty("borderColor") ?
// 		parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
//
// 	var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
// 		parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };
//
// 	// var spriteAlignment = THREE.SpriteAlignment.topLeft;
//
// 	var canvas = document.createElement('canvas');
// 	var context = canvas.getContext('2d');
// 	context.font = "Bold " + fontsize + "px " + fontface;
//
// 	// get size data (height depends only on font size)
// 	var metrics = context.measureText( message );
// 	var textWidth = metrics.width;
// 	console.log(textWidth);
// 	console.log(canvas.width);
// 	// background color
// 	context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
// 								  + backgroundColor.b + "," + backgroundColor.a + ")";
// 	// border color
// 	context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
// 								  + borderColor.b + "," + borderColor.a + ")";
//
// 	context.lineWidth = borderThickness;
// 	roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
// 	// 1.4 is extra height factor for text below baseline: g,j,p,q.
//
// 	// text color
// 	context.fillStyle = "rgba(0, 0, 0, 1.0)";
//
// 	context.fillText( message, borderThickness, fontsize + borderThickness);
//
// 	// canvas contents will be used for a texture
// 	var texture = new THREE.Texture(canvas)
// 	texture.needsUpdate = true;
//
// 	var spriteMaterial = new THREE.SpriteMaterial(
// 		{ map: texture, /*alignment: spriteAlignment*/ } );
// 	var sprite = new THREE.Sprite( spriteMaterial );
// 	sprite.scale.set(100,50,1.0);
// 	return sprite;
// }
//
// // function for drawing rounded rectangles
// function roundRect(ctx, x, y, w, h, r)
// {
//     ctx.beginPath();
//     ctx.moveTo(x+r, y);
//     ctx.lineTo(x+w-r, y);
//     ctx.quadraticCurveTo(x+w, y, x+w, y+r);
//     ctx.lineTo(x+w, y+h-r);
//     ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
//     ctx.lineTo(x+r, y+h);
//     ctx.quadraticCurveTo(x, y+h, x, y+h-r);
//     ctx.lineTo(x, y+r);
//     ctx.quadraticCurveTo(x, y, x+r, y);
//     ctx.closePath();
//     ctx.fill();
// 	ctx.stroke();
// }
