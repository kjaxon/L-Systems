// var WireframeMesh = function(vertexPositions, indices)
// {
//     this.positions = vertexPositions;
//     this.indices = indices;
// }
//
// WireframeMesh.prototype.vertex = function(index)
// {
//     return [this.positions[3*index], this.positions[3*index+1], this.positions[3*index+2]];
// }
//
// WireframeMesh.prototype.render = function(canvas)
// {
//     var context = canvas.getContext('2d');
//     context.beginPath();
//
//     for (var i = 0; i < this.indices.length; i+=2)
//     {
//         var index1 = this.indices[i];
//         var index2 = this.indices[i+1];
//
//         var xyz1 = this.vertex(index1);
//         var xyz2 = this.vertex(index2);
//
//         xyz1[0] = xyz1[0]/xyz1[2];
//         xyz1[1] = xyz1[1]/xyz1[2];
//         xyz2[0] = xyz2[0]/xyz2[2];
//         xyz2[1] = xyz2[1]/xyz2[2];
//
//         // projected points
//         var xy1 = [xyz1[0], xyz1[1]];
//         var xy2 = [xyz2[0], xyz2[1]];
//
//         // projected points scaled and centered within the canvas
//         var aspect = canvas.width/canvas.height;
//         var uv1 = [(xy1[0] + 0.5)*canvas.width, (xy1[1] + 0.5 / aspect)*canvas.width];
//         var uv2 = [(xy2[0] + 0.5)*canvas.width, (xy2[1] + 0.5 / aspect)*canvas.width];
//
//         // draw the line segment
//         context.moveTo(uv1[0], uv1[1]);
//         context.lineTo(uv2[0], uv2[1]);
//     }
//
//     context.stroke();
// }
//
// var Task1 = function(canvas) {
//     this.meshOne = new WireframeMesh(Task1_WireCubePositionsOne, WireCubeIndices);
//     this.meshTwo = new WireframeMesh(Task1_WireCubePositionsTwo, WireCubeIndices);
//     this.meshThree = new WireframeMesh(Task1_SpherePositions, SphereIndices);
// }
//
// Task1.prototype.render = function(canvas, w, h) {
//     this.meshOne.render(canvas);
//     this.meshTwo.render(canvas);
//     this.meshThree.render(canvas);
// }
