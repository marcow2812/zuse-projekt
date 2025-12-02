/*
Copyright (c) 2011 Juan Mellado
Modifiziert: Matrix A auf 4 Zeilen erweitert um SVD Fehler zu beheben.
*/

var POSIT = function(modelSize, focalLength){
  this.model = this.buildModel(modelSize);
  this.focalLength = focalLength;
};

POSIT.prototype.buildModel = function(modelSize){
  var half = modelSize / 2.0;
  
  return [
    {x: -half, y:  half, z: 0.0},
    {x:  half, y:  half, z: 0.0},
    {x:  half, y: -half, z: 0.0},
    {x: -half, y: -half, z: 0.0}
  ];
};

POSIT.prototype.pose = function(imagePoints){
  var modelPoints = this.model;
  var rotation = [ [0,0,0], [0,0,0], [0,0,0] ];
  var translation = [0,0,0];
  var eps = 0.0; //Image center
  var count = 0;
  var converged = false;
  var I0 = [], J0 = [];
  var I = [], J = [];
  var scale, oldScale = 0.0;
  var i, j, k;

  // PseudoInverse
  // KORREKTUR: Wir initialisieren hier 4 Zeilen statt 3, damit m >= n ist.
  var A = [ [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0] ]; 
  
  var U = [ [0,0,0,0], [0,0,0,0], [0,0,0,0] ];
  var W = [0,0,0,0];
  var V = [ [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0] ];
  var B = [ [0,0,0,0], [0,0,0,0], [0,0,0,0] ];

  for (i = 0; i < 4; ++ i){
    A[0][i] = modelPoints[i].x;
    A[1][i] = modelPoints[i].y;
    A[2][i] = modelPoints[i].z;
    A[0][i + 1] = 1.0; // Dies ist die Original-Logik der Library
  }

  SVD.svd(A, W, V);
  
  for (i = 0; i < 4; ++ i){
    if (W[i] !== 0.0){
      W[i] = 1.0 / W[i];
    }
  }

  for (i = 0; i < 4; ++ i){
    for (j = 0; j < 4; ++ j){
      scale = 0.0;
      for (k = 0; k < 4; ++ k){
        scale += V[k][i] * W[k] * A[j][k];
      }
      B[i][j] = scale;
    }
  }

  //Main Loop
  while(count ++ < 20 && !converged){

    if (count === 1){
      for (i = 0; i < 4; ++ i){
        I0[i] = imagePoints[i].x - eps;
        J0[i] = imagePoints[i].y - eps;
      }
    }else{
      scale = 1.0 / translation[2];
      for (i = 0; i < 4; ++ i){
        I0[i] = scale * (rotation[0][0] * modelPoints[i].x + rotation[0][1] * modelPoints[i].y + rotation[0][2] * modelPoints[i].z);
        J0[i] = scale * (rotation[1][0] * modelPoints[i].x + rotation[1][1] * modelPoints[i].y + rotation[1][2] * modelPoints[i].z);
        I0[i] = imagePoints[i].x - eps * (1.0 + I0[i]);
        J0[i] = imagePoints[i].y - eps * (1.0 + J0[i]);
      }
    }

    for (i = 0; i < 3; ++ i){
      I[i] = J[i] = 0.0;
      for (j = 0; j < 4; ++ j){
        I[i] += B[i][j] * I0[j];
        J[i] += B[i][j] * J0[j];
      }
    }
    
    scale = Math.sqrt(I[0]*I[0] + I[1]*I[1] + I[2]*I[2]);
    for (i = 0; i < 3; ++ i){
      rotation[0][i] = I[i] / scale;
      rotation[1][i] = J[i] / scale;
    }
    rotation[2][0] = rotation[0][1] * rotation[1][2] - rotation[0][2] * rotation[1][1];
    rotation[2][1] = rotation[0][2] * rotation[1][0] - rotation[0][0] * rotation[1][2];
    rotation[2][2] = rotation[0][0] * rotation[1][1] - rotation[0][1] * rotation[1][0];
    
    scale = this.focalLength / scale;
    translation[0] = 0.0; 
    translation[1] = 0.0; 
    translation[2] = scale;

    converged = (count > 1 && Math.abs(scale - oldScale) < 0.0001); 
    oldScale = scale;
  }
  
  return {bestRotation: rotation, bestTranslation: translation, bestError: 0.0};
};