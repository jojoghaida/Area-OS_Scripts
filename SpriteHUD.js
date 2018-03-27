//AREA OS HUD//

	var sprites = new THREE.Group();
	scene.add(sprites);

	// var spritey = makeTextSprite( "Group #1");
	// spritey.position.set(0,12,0);
	// sprites.add( spritey );

	var spritey = makeTextSprite( "Group #2",
		{ fontsize: 48, fontface: "Karla", fontColor: {r:255, g:255, b:255, a:1.0}, backgroundColor: {r:58, g:211, b:234, a:1.0} } );
	spritey.position.set(-15,12,32);
	sprites.add( spritey );

function makeTextSprite( message, parameters )
{
    if ( parameters === undefined ) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ?
        parameters["fontface"] : "Karla";

    var fontsize = parameters.hasOwnProperty("fontsize") ?
        parameters["fontsize"] : 48;

		var fontColor = parameters.hasOwnProperty("fontColor") ?
				parameters["fontColor"] : { r:0, g:0, b:0, a:1.0 };

    var borderThickness = parameters.hasOwnProperty("borderThickness") ?
        parameters["borderThickness"] : 0;

    var borderColor = parameters.hasOwnProperty("borderColor") ?
        parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
        parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

    var canvas = document.createElement('canvas');

	  var size = 4096;
	  canvas.width = size;
	  canvas.height = size;
		var context = canvas.getContext('2d');

		context.textAlign = "center";
		context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
																	+ backgroundColor.b + "," + backgroundColor.a + ")";

		context.font = "Bold " + fontsize + "px " + fontface;
		var metrics = context.measureText( message );
    var textWidth = metrics.width + 50;
		console.log(textWidth);
		console.log(fontsize);
	  context.fillRect( size/2 - textWidth/2, (size/2) - fontsize/2, textWidth, fontsize + fontsize/2);

    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
                                  + backgroundColor.b + "," + backgroundColor.a + ")";

    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
                                  + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;

    context.fillStyle = "rgba(" + fontColor.r + "," + fontColor.g + ","
                                + fontColor.b + "," + fontColor.a + ")";

		context.fillText( message, size/2, size/2 + fontsize/2);

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
		texture.premultiplyAlpha = true;
		console.log(texture);

    var spriteMaterial = new THREE.SpriteMaterial({ map: texture});

    var sprite = new THREE.Sprite( spriteMaterial );
		sprite.fog = true;
   	sprite.scale.set(100,100,1.0);
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
