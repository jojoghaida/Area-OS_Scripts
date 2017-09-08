//FORMS//////////////////////////////////////////////////////////////
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
//FORMS//////////////////////////////////////////////////////////////
