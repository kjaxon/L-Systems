function rotateAroundAxisAtPoint(axis, angle, point)
{
    var mat = new SimpleMatrix();
    // TODO: Build a transformation matrix that rotates around a given axis
    //       by the given angle at the given point.
    //       Hint: You will need SimpleMatrix.translate and SimpleMatrix.rotate
    //       Hint: axis and point are arrays. Use axis[0], axis[1], etc.
    //             to get their components
    return mat;
}

var Task3 = function(canvas)
{
    this.mesh = new WireframeMesh_Two(WireCubePositions, WireCubeIndices);
    this.sphereMesh = new WireframeMesh_Two(SpherePositions, SphereIndices);
    this.cameraAngle = 0;
}

Task3.prototype.render = function(canvas, w, h)
{
    var context = canvas.getContext('2d');
    clear(context, w, h);

    var angle = Date.now()/10;
    var cameraView = SimpleMatrix.rotate(this.cameraAngle, 1, 0, 0);

    var view = SimpleMatrix.translate(0, 0, 40);
    view = SimpleMatrix.multiply(view, cameraView);

    var sphereOnePos = SimpleMatrix.translate(7, 4.6, 0);
    var sphereTwoPos = SimpleMatrix.translate(-3, -2, 0);

    var cubeOneAnim = rotateAroundAxisAtPoint([1, 0, 0], angle, [7, 4.6, 0]);
    var cubeTwoAnim = rotateAroundAxisAtPoint([0, -1, 0], angle, [7, 4.6, 0]);
    var cubeThreeAnim = rotateAroundAxisAtPoint([0, 1, 0], angle, [-3, -2, 0]);
    var cubeFourAnim = rotateAroundAxisAtPoint([-1, 0, 0], angle, [-3, -2, 0]);

    var cubeOneTransform = SimpleMatrix.multiply(view, cubeOneAnim);
    var cubeTwoTransform = SimpleMatrix.multiply(view, cubeTwoAnim);
    var cubeThreeTransform = SimpleMatrix.multiply(view, cubeThreeAnim);
    var cubeFourTransform = SimpleMatrix.multiply(view, cubeFourAnim);

    var sphereOneTransform = SimpleMatrix.multiply(view, sphereOnePos);
    var sphereTwoTransform = SimpleMatrix.multiply(view, sphereTwoPos);

    this.mesh.render(canvas, cubeOneTransform);
    this.mesh.render(canvas, cubeTwoTransform);
    this.mesh.render(canvas, cubeThreeTransform);
    this.mesh.render(canvas, cubeFourTransform);

    this.sphereMesh.render(canvas, sphereOneTransform);
    this.sphereMesh.render(canvas, sphereTwoTransform);
}

Task3.prototype.dragCamera = function(dy)
{
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
