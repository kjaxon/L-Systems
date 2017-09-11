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
    // TODO: Create and return a Scale Matrix
    return matrix;
};

SimpleMatrix.translate = function(x, y, z) {
    matrix = new SimpleMatrix();
    // TODO: Create and return a Translation Matrix
    return matrix;
};

SimpleMatrix.rotate = function(a, x, y, z) {
    matrix = new SimpleMatrix();
    // TODO: Create and return a Rotation Matrix
    return matrix;
}


SimpleMatrix.multiplyVector = function(matrix, vector)
{
    newVector = [0, 0, 0];
    // TODO: Implement Matrix Vector multiplication
    // Hint: Treat the incoming vector data as a 4-vec with 1 as the 4th component
    // Hint: For this assignment you only need the x,y,z components of the product
    return newVector;
}
