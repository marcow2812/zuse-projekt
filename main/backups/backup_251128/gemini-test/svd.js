/*
Copyright (c) 2011 Juan Mellado

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var SVD = {};

SVD.svd = function(A, W, V){
  var m = A.length, n = A[0].length, mn = Math.max(m, n);
  var rv1 = new Float32Array(n);
  var w = W || new Float32Array(n);
  var v = V || new Float32Array(n * n);
  var anorm = 0.0, g = 0.0, scale = 0.0;
  var c, f, h, s, x, y, z;
  var i, j, k, l, jj;

  if (m < n){
    throw "SVD: m < n";
  }

  for (i = 0; i < n; ++ i){
    l = i + 1;
    rv1[i] = scale * g;
    g = 0.0;
    s = 0.0;
    scale = 0.0;
  
    if (i < m){
      for (k = i; k < m; ++ k){
        scale += Math.abs( A[k][i] );
      }
      if (scale !== 0.0){
        for (k = i; k < m; ++ k){
          A[k][i] /= scale;
          s += A[k][i] * A[k][i];
        }
        f = A[i][i];
        g = -Math.sqrt(s) * (f > 0.0? 1.0: -1.0); //SGN
        h = f * g - s;
        A[i][i] = f - g;
        for (j = l; j < n; ++ j){
          s = 0.0;
          for (k = i; k < m; ++ k){
            s += A[k][i] * A[k][j];
          }
          f = s / h;
          for (k = i; k < m; ++ k){
            A[k][j] += f * A[k][i];
          }
        }
        for (k = i; k < m; ++ k){
          A[k][i] *= scale;
        }
      }
    }

    w[i] = scale * g;
    g = 0.0;
    s = 0.0;
    scale = 0.0;
  
    if (i < m && i !== n - 1){
      for (k = l; k < n; ++ k){
        scale += Math.abs( A[i][k] );
      }
      if (scale !== 0.0){
        for (k = l; k < n; ++ k){
          A[i][k] /= scale;
          s += A[i][k] * A[i][k];
        }
        f = A[i][l];
        g = -Math.sqrt(s) * (f > 0.0? 1.0: -1.0); //SGN
        h = f * g - s;
        A[i][l] = f - g;
        for (k = l; k < n; ++ k){
          rv1[k] = A[i][k] / h;
        }
        for (j = l; j < m; ++ j){
          s = 0.0;
          for (k = l; k < n; ++ k){
            s += A[j][k] * A[i][k];
          }
          for (k = l; k < n; ++ k){
            A[j][k] += s * rv1[k];
          }
        }
        for (k = l; k < n; ++ k){
          A[i][k] *= scale;
        }
      }
    }
  
    anorm = Math.max(anorm, (Math.abs( w[i] ) + Math.abs( rv1[i] )) );
  }

  for (i = n - 1; i >= 0; -- i){
    if (i < n - 1){
      if (g !== 0.0){
        for (j = l; j < n; ++ j){
          v[j * n + i] = ( A[i][j] / A[i][l] ) / g;
        }
        for (j = l; j < n; ++ j){
          s = 0.0;
          for (k = l; k < n; ++ k){
            s += A[i][k] * v[k * n + j];
          }
          for (k = l; k < n; ++ k){
            v[k * n + j] += s * v[k * n + i];
          }
        }
      }
      for (j = l; j < n; ++ j){
        v[i * n + j] = v[j * n + i] = 0.0;
      }
    }
    v[i * n + i] = 1.0;
    g = rv1[i];
    l = i;
  }

  for (i = Math.min(m, n) - 1; i >= 0; -- i){
    l = i + 1;
    g = w[i];
    for (j = l; j < n; ++ j){
      A[i][j] = 0.0;
    }
    if (g !== 0.0){
      g = 1.0 / g;
      for (j = l; j < n; ++ j){
        s = 0.0;
        for (k = l; k < m; ++ k){
          s += A[k][i] * A[k][j];
        }
        f = (s / A[i][i]) * g;
        for (k = i; k < m; ++ k){
          A[k][j] += f * A[k][i];
        }
      }
      for (j = i; j < m; ++ j){
        A[j][i] *= g;
      }
    }else{
      for (j = i; j < m; ++ j){
        A[j][i] = 0.0;
      }
    }
    ++ A[i][i];
  }

  for (k = n - 1; k >= 0; -- k){
    for (jj = 0; jj < 30; ++ jj){
      var flag = true;
      for (l = k; l >= 0; -- l){
        if (Math.abs( rv1[l] ) + anorm === anorm){
          flag = false;
          break;
        }
        if (l === 0){ //break
           break;
        }
        if (Math.abs( w[l - 1] ) + anorm === anorm){
          break;
        }
      }
      
      if (flag){
        c = 0.0;
        s = 1.0;
        for (i = l; i <= k; ++ i){
          f = s * rv1[i];
          rv1[i] = c * rv1[i];
          if (Math.abs(f) + anorm === anorm){
            break;
          }
          g = w[i];
          h = Math.sqrt(f * f + g * g); //pythag
          w[i] = h;
          h = 1.0 / h;
          c = g * h;
          s = -f * h;
          for (j = 0; j < m; ++ j){
            y = A[j][l - 1];
            z = A[j][i];
            A[j][l - 1] = y * c + z * s;
            A[j][i] = z * c - y * s;
          }
        }
      }
      
      z = w[k];
      if (l === k){
        if (z < 0.0){
          w[k] = -z;
          for (j = 0; j < n; ++ j){
            v[j * n + k] = -v[j * n + k];
          }
        }
        break;
      }
      
      if (jj === 29){
        break; //no convergence
      }
      
      x = w[l];
      y = w[k - 1];
      g = rv1[k - 1];
      h = rv1[k];
      f = ((y - z) * (y + z) + (g - h) * (g + h)) / (2.0 * h * y);
      g = Math.sqrt(f * f + 1.0); //pythag
      f = ((x - z) * (x + z) + h * ((y / (f + (f >= 0.0? Math.abs(g): -Math.abs(g)))) - h)) / x;
      c = s = 1.0;
      
      for (j = l; j <= k - 1; ++ j){
        g = rv1[j + 1];
        y = w[j + 1];
        h = s * g;
        g = c * g;
        z = Math.sqrt(f * f + h * h); //pythag
        rv1[j] = z;
        c = f / z;
        s = h / z;
        f = x * c + g * s;
        g = g * c - x * s;
        h = y * s;
        y = y * c;
        for (i = 0; i < n; ++ i){
          x = v[i * n + j];
          z = v[i * n + (j + 1)];
          v[i * n + j] = x * c + z * s;
          v[i * n + (j + 1)] = z * c - x * s;
        }
        z = Math.sqrt(f * f + h * h); //pythag
        w[j] = z;
        if (z !== 0.0){
          z = 1.0 / z;
          c = f * z;
          s = h * z;
        }
        f = c * g + s * y;
        x = c * y - s * g;
        for (i = 0; i < m; ++ i){
          y = A[i][j];
          z = A[i][j + 1];
          A[i][j] = y * c + z * s;
          A[i][j + 1] = z * c - y * s;
        }
      }
      
      rv1[l] = 0.0;
      rv1[k] = f;
      w[k] = x;
    }
  }

  return w;
};