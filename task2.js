var WireframeMesh_Two = function(vertexPositions, indices)
{
    this.positions = vertexPositions;
    this.indices = indices;
}

WireframeMesh_Two.prototype.vertex = function(index)
{
    return [this.positions[3*index], this.positions[3*index+1], this.positions[3*index+2]];
}

WireframeMesh_Two.prototype.render = function(canvas, transform)
{
    var context = canvas.getContext('2d');

    context.beginPath();
    for (var i = 0; i < this.indices.length; i+=2)
    {
        var index1 = this.indices[i];
        var index2 = this.indices[i+1];

        var xyz1 = this.vertex(index1);
        var xyz2 = this.vertex(index2);

        // apply transform
        xyz1 = SimpleMatrix.multiplyVector(transform, xyz1);
        xyz2 = SimpleMatrix.multiplyVector(transform, xyz2);

        xyz1[0] = xyz1[0]/xyz1[2];
        xyz1[1] = xyz1[1]/xyz1[2];
        xyz2[0] = xyz2[0]/xyz2[2];
        xyz2[1] = xyz2[1]/xyz2[2];


        // projected points
        var xy1 = [xyz1[0], xyz1[1]];
        var xy2 = [xyz2[0], xyz2[1]];

        // projected points scaled and centered within the canvas
        var aspect = canvas.width/canvas.height;
        var uv1 = [(xy1[0] + 0.5)*canvas.width, (xy1[1] + 0.5 / aspect)*canvas.width];
        var uv2 = [(xy2[0] + 0.5)*canvas.width, (xy2[1] + 0.5 / aspect)*canvas.width];

        // draw the line segment
        context.moveTo(uv1[0], uv1[1]);
        context.lineTo(uv2[0], uv2[1]);
    }
    context.stroke();
}

var Task2 = function(canvas)
{
    this.scaleMesh = new WireframeMesh_Two(Task2_WireCubePositions, WireCubeIndices);
    this.transMesh = new WireframeMesh_Two(WireCubePositions, WireCubeIndices);
    this.rotMesh = new WireframeMesh_Two(SpherePositions, SphereIndices);
    this.cameraAngle = 0;
}

function clear(context, w, h)
{
    context.fillStyle = "#fff";
    context.fillRect(0, 0, w, h);
}

Task2.prototype.render = function(canvas, w, h)
{

    var context = canvas.getContext('2d');
    clear(context, w, h);

    var cameraView = SimpleMatrix.rotate(this.cameraAngle, 1, 0, 0);

    var scaleAnim = SimpleMatrix.scale(Math.abs(Math.cos(Date.now() / 1000)), Math.abs(Math.cos(Date.now() / 1000)), 1);

    var transPos = SimpleMatrix.translate(-3, 0, 13);//100, 100, 0.5);
    var transAnim = SimpleMatrix.translate(Math.sin(Date.now() / 1000), Math.cos(Date.now() / 1000), 0);

    var rotAnim = SimpleMatrix.rotate(Date.now()/30, 1, 1, 1);
    var rotPos = SimpleMatrix.translate(3, 0, 13);

    var scaleMeshTransform = new SimpleMatrix();
    var transMeshTransform = new SimpleMatrix();
    var rotMeshTransform = new SimpleMatrix();

    scaleMeshTransform =
      SimpleMatrix.multiply(
        SimpleMatrix.multiply(cameraView, scaleAnim), scaleMeshTransform);

    transMeshTransform =
      SimpleMatrix.multiply(
        SimpleMatrix.multiply(
          cameraView,
          SimpleMatrix.multiply(transAnim, transPos)),
          transMeshTransform);

    rotMeshTransform =
      SimpleMatrix.multiply(
        SimpleMatrix.multiply(cameraView,
          SimpleMatrix.multiply(rotPos, rotAnim)),
          rotMeshTransform);

    this.scaleMesh.render(canvas, scaleMeshTransform);
    this.transMesh.render(canvas, transMeshTransform);
    this.rotMesh.render(canvas, rotMeshTransform);
}

Task2.prototype.dragCamera = function(dy)
{
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -20), 20);
}
