//Area OS Styles Sheet
var aOS_ColorStyles = {
  aOS_OSblue: "#0851a4",
  basicChairColor: "#0092ff",
};
////////////////////////////////////////////////////
var userSelectionMaterials = {
  mesh: new THREE.MeshBasicMaterial({color: "red", transparent: true, opacity: 1, /*envMap: "reflection"*/}),
  line: new THREE.LineBasicMaterial({ color: "pink", linewidth: .1 }),
}

var occupiedMaterials = {
  mesh: new THREE.MeshBasicMaterial({color: "white", transparent: true, opacity: .8, /*envMap: "reflection"*/}),
  line: new THREE.LineBasicMaterial({ color: "grey", linewidth: .1 }),
}
////////////////////////////////////////////////////
var metaBasicChair = {
  name: "Chair",
  styles: {
    mesh: new THREE.MeshBasicMaterial({color: 0x0092ff, transparent: true, opacity: 1}),
    line: new THREE.LineBasicMaterial({ color: 0x9ed5ff, linewidth: .1 }),
    glyph: document.getElementById('basicChairGlyphy'),
  },
  metaData: {
    typ: "furniture",
    displayName: "chair",
  }
}

var metaBasicDesk = {
  name: "Desk",
  styles: {
    mesh: new THREE.MeshBasicMaterial({color: 0x3ad3ea, transparent: true, opacity: 1}),
    line: new THREE.LineBasicMaterial({ color: 0x33b7cc, linewidth: .1 }),
    glyph: document.getElementById('workStoolGlyphy'),
  },
  metaData: {
    typ: "furniture",
    displayName: "desk",
  }
}

var metaBasicTable = {
  name: "Table",
  styles: {
    mesh: new THREE.MeshBasicMaterial({color: 0xaf92ef, transparent: true, opacity: 1}),
    line: new THREE.LineBasicMaterial({ color: 0x66558c, linewidth: .1 }),
    glyph: document.getElementById('conferenceTableGlyphy'),
  },
  metaData: {
    typ: "furniture",
    displayName: "table",
    insertionMethod: "center",
  }
}

////////////////////////////////////////////////////

//line Styles
var aOS_LineStyles = {

    thin: {
      blueLine: new THREE.LineBasicMaterial({}),
      redLine: new THREE.LineBasicMaterial({}),
      yellowLine: new THREE.LineBasicMaterial({}),
      greenLine: new THREE.LineBasicMaterial({}),
      aOS_LightGreen: new THREE.LineBasicMaterial({color: 0x7ce7c9, linewidth: .25}),
    },

    normal: {
      blueLine: new THREE.LineBasicMaterial({}),
      redLine: new THREE.LineBasicMaterial({}),
      yellowLine: new THREE.LineBasicMaterial({}),
      greenLine: new THREE.LineBasicMaterial({}),
    },

    thick: {
      blueLine: new THREE.LineBasicMaterial({}),
      redLine: new THREE.LineBasicMaterial({}),
      yellowLine: new THREE.LineBasicMaterial({}),
      greenLine: new THREE.LineBasicMaterial({}),
    },

    thickest: {
      blueLine: new THREE.LineBasicMaterial({}),
      redLine: new THREE.LineBasicMaterial({}),
      yellowLine: new THREE.LineBasicMaterial({}),
      greenLine: new THREE.LineBasicMaterial({}),
    }
};

var aOS_DashedLineStyles = {

  thin: {
    dashedBlueLine: new THREE.LineBasicMaterial({}),
    dashedRedLine: new THREE.LineBasicMaterial({}),
    dashedYellowLine: new THREE.LineBasicMaterial({}),
    dashedGreenLine: new THREE.LineBasicMaterial({}),
  },

  normal: {
    dashedBlueLine: new THREE.LineBasicMaterial({}),
    dashedRedLine: new THREE.LineBasicMaterial({}),
    dashedYellowLine: new THREE.LineBasicMaterial({}),
    dashedGreenLine: new THREE.LineBasicMaterial({}),
  },

  thick: {
    dashedBlueLine: new THREE.LineBasicMaterial({}),
    dashedRedLine: new THREE.LineBasicMaterial({}),
    dashedYellowLine: new THREE.LineBasicMaterial({}),
    dashedGreenLine: new THREE.LineBasicMaterial({}),
  },

  thickest: {
    dashedBlueLine: new THREE.LineBasicMaterial({}),
    dashedRedLine: new THREE.LineBasicMaterial({}),
    dashedYellowLine: new THREE.LineBasicMaterial({}),
    dashedGreenLine: new THREE.LineBasicMaterial({}),
  }

};

var aOS_PointStyles = {
  white: new THREE.PointsMaterial({color: "white", size: 1}),
  blue: new THREE.PointsMaterial({color: "blue"}),
  red: new THREE.PointsMaterial({color: "red"}),
  yellow: new THREE.PointsMaterial({color: "yellow"}),
  green: new THREE.PointsMaterial({color: "green"}),
  aOS_LightGreen: new THREE.PointsMaterial({color: 0x7ce7c9, size: 1}),
  aOS_DarkGrey: new THREE.PointsMaterial({color: 0x3e444c, size: 1}),
};


//mesh Styles
var aOS_MeshStyles = {
  blueMeshBasic: new THREE.MeshBasicMaterial({}),
  redMeshBasic: new THREE.MeshBasicMaterial({}),
  yellowMeshBasic: new THREE.MeshBasicMaterial({}),
  greenMeshBasic: new THREE.MeshBasicMaterial({}),
};

//MENU OBJECTS
var menuObjects = {
  locations:{
    name: 'Locations',
    neighborhood: {
      name: 'Neighborhood',
      hellsKitchen: {
        name: "Hell's Kitchen",
        clickFun: function(){console.log('HK selected!')},
      },
      lowerEastSide: {
        name: "LES",
        clickFun: function(){console.log('LES selected')},
      },
    }
  }
}
//MENU OBJECTS

//SLIDER OBJECTS
var basicChairSL = null;

function loadSliderStyles(){
  basicChairSL = {
    name: "Chair(s)",
    glyph: "put Two.js glyph here",
    color: aOS_ColorStyles.basicChairColor,
    mesh: chairMesh,
    function: 0,
  }
}
setTimeout(loadSliderStyles,4000);
//SLIDER OBJECTS
