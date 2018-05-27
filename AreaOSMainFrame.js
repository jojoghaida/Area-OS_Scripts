//* Copyright (c) 2016 - 2018 joeghaida / http://joeghaida.com
var logAllFunctions = true;

// SQstuff
function leaseIgnition(areaRequest){
}
var occupy = true;
var onHold = []; // store annex here

function checkSQ(meshToCheckSQ,requestedSQ){
var faceListSize = meshToCheckSQ.faces.length
var areaSQ = 0.00
for (i = 0; i < faceListSize; i++){
var va = meshToCheckSQ.vertices[meshToCheckSQ.faces[i].a];
var vb = meshToCheckSQ.vertices[meshToCheckSQ.faces[i].b];
var vc = meshToCheckSQ.vertices[meshToCheckSQ.faces[i].c];
var ab = vb.clone().sub(va);
var ac = vc.clone().sub(va);
var cross = new THREE.Vector3();
cross.crossVectors( ab, ac );
areaSQ += cross.length() / 2;
}
if(areaSQ<requestedSQ){
  }else{
    var li = 0;
    occupy = false;
  }
}


  // trivial variables for live preview
  var stPt = new THREE.Vector3(-40,0,35); // init for populator
  dropCircle(stPt); // style init position
  var mainTrajectory = new THREE.Vector3(1,0,0); //
  var endPt = pushPointDirection(stPt,mainTrajectory);

  var inputMainCrv = twoPtCurve(stPt,endPt);
  var inputMainCrvGrowthInterval = .5;
  var editMainCrv = null;

  var on2nd = false;
  var secondaryConCrvs = [];
  var secondaryConCrvsGrothInterval = .5;
  var editSecCrv = null;

  var furnitureGroup = [];
  var anmot_tri_G = [];
  var annot_txt_G = [];
  // trivial variables for live preview \\

  var logDrawF = true;
  var drawBool = false;

///////////////////newcode
  var cursorBool = 1;
  var cursorFadeBool = 1;
  var cursor = new THREE.PointLight(0x0092ff, 1, 10000);
  lightLocation = stPt.clone();
  lightLocation.y = 1;
  cursor.position.set(lightLocation.x,lightLocation.y,lightLocation.z);
  scene.add(cursor);
  renderer.render(scene,camera);
///////////////////newcode


  function drawElements(){ /*design to be looped live*/ //if(logDrawF==true){console.log("drawElements() is running. Request is =",selectorText.value);};

    drawBool = true;


    if(selectorText.value>furnitureGroup.length){ /*addition*/
      drawBool = true;
      if(on2nd==false){ /*first addition*/
        extendCrv(inputMainCrv,inputMainCrvGrowthInterval,getCrvVector(inputMainCrv)); if(logDrawF==true){console.log("main curve extension. new distance =",getCrvLength(inputMainCrv));};
        if(Number(getCrvLength(inputMainCrv).toFixed(2))/4 /*<<<spacing tempo*/ % 1 == 0){ if(logDrawF==true){console.log("producing new trajectory curve.");};
          //test
          on2nd = true;
          a = inputMainCrv.geometry.vertices[1].clone();
          bD = getOffsetDirection(inputMainCrv);
          b = pushPointDirection(a,bD);
          inputSecondaryCrv = twoPtCurve(a,b);
          // secondaryConCrvs.push(inputSecondaryCrv);
          triangle = dropTriangle(a.clone(),pushPointDirection(a,getCrvVector(inputMainCrv)),b.clone());
          anmot_tri_G.push(triangle);
          // furnitureGroup.add(dropChairs(inputMainCrv.geometry.vertices[1],getCrvVector(inputMainCrv))); if(logDrawF==true){console.log(furnitureGroup.children.length,"chairs");}
          renderer.render(scene,camera);
          //test
        }
      }/*first addition end*/else{//second curve addition
        extendCrv(inputSecondaryCrv,secondaryConCrvsGrothInterval,getCrvVector(inputSecondaryCrv));// may have to change set up here so that max length is checked before extending curve
        if(Number(getCrvLength(inputSecondaryCrv).toFixed(2))/2 /*<<<spacing tempo*/ % 1 == 0){

          // dropPtLight2(inputSecondaryCrv.geometry.vertices[1].clone()); //dicks

          furnitureGroup.push(dropChairs(inputSecondaryCrv.geometry.vertices[1],getCrvVector(inputMainCrv)));
          cursor.position.set(furnitureGroup[furnitureGroup.length-1].position.x,furnitureGroup[furnitureGroup.length-1].position.y+1,furnitureGroup[furnitureGroup.length-1].position.z);//make a function!
          renderer.render(scene,camera);
        }
        if(Number(getCrvLength(inputSecondaryCrv).toFixed(2)) >= 15){
          on2nd = false;
          secondaryConCrvs.push(inputSecondaryCrv);
          annot_txt_G.push(dropText(secondaryConCrvs.length,pushPointDirection(inputSecondaryCrv.geometry.vertices[1].clone(),getCrvVector(inputSecondaryCrv)),fontKarla_Reg));
        }
      }//second curve addition end*\
      if(selectorText.value>furnitureGroup.length){setTimeout(drawElements,.1)}/*REBOOT~~*/
    }//addition end*\

    if(selectorText.value<furnitureGroup.length){ /*reduction*/ if(logDrawF==true){console.log("Reduction");};
      drawBool = true;
      if(on2nd==false){ //curve1 reduction
        extendCrv(inputMainCrv,-inputMainCrvGrowthInterval,getCrvVector(inputMainCrv)); if(logDrawF==true){console.log("main curve reduction. new distance =",getCrvLength(inputMainCrv));};
        if(Number(getCrvLength(inputMainCrv).toFixed(2))/4 /*<<<spacing tempo*/ % 1 == 0){ if(logDrawF==true){console.log("reducing new trajectory curve.");};
          on2nd = true;
          inputSecondaryCrv = secondaryConCrvs.pop(); if(logDrawF==true){console.log("secondaryConCrvs.length =",secondaryConCrvs.length);};
        }
        // if(selectorText.value<furnitureGroup.children.length){setTimeout(drawElements,.1)}//REBOOT~~
      }/*curve2 reduction end*/else{//second curve reduction
        extendCrv(inputSecondaryCrv,-secondaryConCrvsGrothInterval,getCrvVector(inputSecondaryCrv));
        if(Number(getCrvLength(inputSecondaryCrv).toFixed(2))/2 /*<<<spacing tempo*/ % 1 == 0){
          removal = furnitureGroup.pop();
          scene.remove(removal);
          cursor.position.set(furnitureGroup[furnitureGroup.length-1].position.x,furnitureGroup[furnitureGroup.length-1].position.y+1,furnitureGroup[furnitureGroup.length-1].position.z);//make a function!
          renderer.render(scene,camera);
        }
        if(Number(getCrvLength(inputSecondaryCrv).toFixed(2)) <= secondaryConCrvsGrothInterval){ if(logDrawF==true){console.log("removing trajectory curve");};
          scene.remove(inputSecondaryCrv);
          scene.remove(anmot_tri_G.pop());
          scene.remove(annot_txt_G.pop());
          renderer.render(scene,camera);
          on2nd = false;
        }
      }//second curve reduction end*\
      if(selectorText.value<furnitureGroup.length){setTimeout(drawElements,.1)}/*REBOOT~~*/
    }//reduction end*\

    if(selectorText.value == furnitureGroup.length){ //stop; switch bool off
      drawBool = false;
    }

  }//drawElements end*\

  function cahceElements(){ /*installs elements on load*/

  }

  function liveCursor(){
    current = cursor.intensity;
    if(cursorFadeBool==0){
      cursor.intensity = Number((cursor.intensity+.01).toFixed(2));
      if(cursor.intensity == 1){cursorFadeBool = 1}
    }else{
      cursor.intensity = Number((cursor.intensity-.01).toFixed(2));
      if(cursor.intensity == .5){cursorFadeBool = 0}
    }
    renderer.render(scene,camera);
    if(cursorBool == 1){
      var runCursor = setTimeout(liveCursor,.1);
    }else{
      clearInterval(runCursor);
      cursorFadeBool = 1;
    }
  }
liveCursor(1);
///////////////////////////////////////////////////////////////////////

function newCrawler(pt, steps = 220, init_Dir = 0){
  dropPtLight(pt,0x26D8A5);
  dropCircle(pt.geometry.vertices[0]);
  pastPt = pt;
  vacantPts = scene.getObjectByName("vacantPts");
  occupiedPts = scene.getObjectByName("occupiedPts");
  stepNum = 0;

  crvSegments = [];
  crvOcPts = [];
  vecHist = [];

  var matrixDirection = init_Dir;//<<<fix
  function animateCrawl(){
    if(stepNum < steps){
      stepNum++
      crvVert1 = pastPt.geometry.vertices[0].clone();
      ptCoord = translator(pastPt);
      availableMatrixNeighbors = getAvailableMatrixNeighbors(ptCoord);
      matrixDirection2 = [matrixDirection-2,matrixDirection-1,matrixDirection+1,matrixDirection+2];
      if(matrixDirection2[0]==-2){matrixDirection2[1]=6}
      if(matrixDirection2[1]==-1){matrixDirection2[1]=7}
      if(matrixDirection2[2]==8){matrixDirection2[2]=0}
      if(matrixDirection2[3]==9){matrixDirection2[2]=1}
      console.log(matrixDirection2);
      if(availableMatrixNeighbors[matrixDirection] != null){
        newPt = availableMatrixNeighbors[matrixDirection];

      }else{
        for(i = 0; i < matrixDirection2.length; i++){
          newPt = availableMatrixNeighbors[matrixDirection2[i]];
          if(newPt != null){
            matrixDirection = matrixDirection2[i]
            break
          }
        }
      }
      // newPt = findRandomnAdjacentMatrix(ptCoord);
      // console.log("newPt = ",newPt);
      if(newPt!= undefined){
        crvVert2 = newPt.geometry.vertices[0].clone();
        if(stepNum == 1){
          crvSegments.push(twoPtCurve(crvVert1.clone(),crvVert2.clone(),null,new THREE.LineBasicMaterial({color: 0x26D8A5})));
          vecHist.push(matrixDirection);
          console.log(vecHist);

        }else{
          // dropPtLight(pastPt);

          if(matrixDirection != vecHist[vecHist.length-1]){
            console.log("HEY");
            vecHist.push(matrixDirection);//now make new crv!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            crvSegments.push(twoPtCurve(crvVert1.clone(),crvVert2.clone(),null,new THREE.LineBasicMaterial({color: 0x26D8A5})));
            dropPtLight(pastPt);

          }
          crvSegments[crvSegments.length-1].geometry.vertices[1].copy(crvVert2);
          crvSegments[crvSegments.length-1].geometry.verticesNeedUpdate = true;
          crvSegments[crvSegments.length-1].geometry.computeBoundingSphere();
          renderer.render(scene,camera);
        }
        pastPt.material = aOS_PointStyles.aOS_LightGreen;
        occupiedPts.add(pastPt);
        vacantPts.remove(pastPt);
        pastPt = newPt;
        console.log(getCrvLength(crvSegments[crvSegments.length-1]).toFixed(2));
        if(getCrvLength(crvSegments[crvSegments.length-1]).toFixed(2)/2 % 1 == 0){
          console.log("!!!!");
        }

        setTimeout(animateCrawl,100);
      }else{
        dropPtLight(pastPt,"red");
        renderer.render(scene,camera);
        stepNum = steps;
      }
      if(newPt != undefined && stepNum == steps){
        dropPtLight(newPt,"red");
        renderer.render(scene,camera);
      }
    }
  }
  animateCrawl();
}

  // setTimeout(
  //   function (){
  //     newCrawler(scene.getObjectByName("18,0"),450,0);
  //   },1000);
