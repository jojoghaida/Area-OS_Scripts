//Area OS Styles Sheet

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
