/*
    lightgl.js matrix class
    https://github.com/evanw/lightgl.js/

    Copyright (C) 2011 by Evan Wallace

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

var hasFloat32Array = (typeof Float32Array != 'undefined');

function SimpleMatrix() {
    var m = Array.prototype.concat.apply([], arguments);
    if (!m.length) {
        m = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
    }
    this.m = hasFloat32Array ? new Float32Array(m) : m;
}

SimpleMatrix.multiply = function(left, right) {
  matrix = new SimpleMatrix();
  var a = left.m, b = right.m, m = matrix.m;

  m[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
  m[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
  m[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
  m[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

  m[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
  m[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
  m[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
  m[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

  m[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
  m[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
  m[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
  m[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

  m[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
  m[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
  m[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
  m[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

  return matrix;
};

// Your code starts here

SimpleMatrix.scale = function(x, y, z)
{
    matrix = new SimpleMatrix();
    var m = matrix.m;
    m[0] = x;
    m[5] = y;
    m[10] = z;

    return matrix;
};

SimpleMatrix.translate = function(x, y, z) {
    matrix = new SimpleMatrix();
    var m = matrix.m;
    m[3] = x;
    m[7] = y;
    m[11] = z;

    return matrix;
};

function getRotationMatrix(a, x, y, z) {
  a *= Math.PI/180;
  matrix = new SimpleMatrix();
  var m = matrix.m;
  if (x == 1) {
    m[5] = Math.cos(a);
    m[10] = Math.cos(a);
    m[9] = Math.sin(a);
    m[6] = -Math.sin(a);
  } else if (y == 1) {
    m[0] = Math.cos(a);
    m[2] = Math.sin(a);
    m[8] = -Math.sin(a);
    m[10] = Math.cos(a);
  } else {
    m[0] = Math.cos(a);
    m[1] = Math.sin(a);
    m[4] = -Math.sin(a);
    m[5] = Math.cos(a);
  }
  return matrix;
}

function getUnitVector(vector) {
  var x = vector[0], y = vector[1], z = vector[2];
  var magnitude = Math.sqrt((Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2)));
  var unitVector = [x/magnitude, y/magnitude, z/magnitude];
  return unitVector;
}

function getTVector(vector) {
  var tVector = vector.slice();
  var x = tVector[0], y = tVector[1], z = tVector[2];
  var smallestMagnitude = Math.min(Math.min(Math.abs(x), Math.abs(y)), Math.abs(z));
  for (var i = 0; i < tVector.length; i++) {
    if (Math.abs(vector[i]) == smallestMagnitude) {
      tVector[i] = 1;
      return tVector;
    }
  }
  return tVector;
}

function crossProductVector(left, right){
  var crossProduct = [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ]
  return crossProduct;
}

SimpleMatrix.rotate = function(a, x, y, z) {
  if (x == 1 && y == 0 && z == 0) {
    return getRotationMatrix(a, 1, 0, 0);
  } else if ( x == 0 && y == 1 && z == 0) {
    return getRotationMatrix(a, 0, 1, 0);
  } else if ( x == 0 && y == 0 && z == 1) {
    return getRotationMatrix(a, 0, 0, 1);
  } else {
    var w = getUnitVector([x, y, z]);
    var t = getTVector(w);
    var u = getUnitVector(crossProductVector(t, w));
    var v = crossProductVector(u, w);

    var orthonormalBasis = new SimpleMatrix();
    orthonormalBasis.m = [
      u[0], u[1], u[2], 0,
      v[0], v[1], v[2], 0,
      w[0], w[1], w[2], 0,
      0,   0,     0,    1
    ];
    var canonicalBasis = new SimpleMatrix();
    canonicalBasis.m = [
      u[0], v[0], w[0], 0,
      u[1], v[1], w[1], 0,
      u[2], v[2], w[2], 0,
      0,    0,    0,    1
    ];
    var Rz = getRotationMatrix(a, 0, 0, 1);
    var rotationMatrix =
      this.multiply(
        this.multiply(canonicalBasis, Rz), orthonormalBasis);
    return rotationMatrix;

  }
}


SimpleMatrix.multiplyVector = function(matrix, vector)
{
    var m = matrix.m;
    var newVector = [0, 0, 0];
    newVector[0] = m[0] * vector[0] + m[1] * vector[1] + m[2] * vector[2] + m[3] * 1;
    newVector[1] = m[4] * vector[0] + m[5] * vector[1] + m[6] * vector[2] + m[7] * 1;
    newVector[2] = m[8] * vector[0] + m[9] * vector[1] + m[10] * vector[2] + m[11] * 1;
    return newVector;
}
