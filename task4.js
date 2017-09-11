var Bone = function(parent, position, scale, jointLocation, jointAxis) {
    this.parent = parent;
    this.position = position;
    this.scale = scale;
    this.jointLocation = jointLocation
    this.jointAxis = jointAxis;
    this.jointAngle = 0;
}

Bone.prototype.setJointAngle = function(angle) {
    this.jointAngle = angle;
}

Bone.prototype.computePoseMatrix = function() {
    var pose = new SimpleMatrix();
    // TODO: Compute the pose matrix of this point (i.e. transformation matrix
    //       with translation+rotation, but no scaling) and return it.
    //       The matrix should translate by this.position and rotate around this.jointAxis
    //       at this.jointLocation by this.jointAngle

    //       If this.parent is not null, you should also apply the pose matrix of the parent
    //       to get a hierarchical transform.
    return pose;
}

Bone.prototype.computeModelMatrix = function() {
    var pose = new SimpleMatrix();
    // TODO: Compute the model matrix of this bone (i.e. pose matrix + scaling)
    //       and return it.
    //       Use this.computePoseMatrix and this.scale to build the matrix
    return pose;
}

var Task4 = function(canvas) {
    this.cameraAngle = 0;
    this.mesh = new WireframeMesh_Two(WireCubePositions, WireCubeIndices);

    var hip       = new Bone(     null, [0,    1.5, 0  ], [0.5,  0.3, 0.2], [0, 0,    0   ], [0, 1, 0]);
    var leftThigh = new Bone(      hip, [0.5, -1.1, 0.1], [0.1,  0.7, 0.1], [0, 0.7,  0   ], [1, 0, 0]);
    var leftShin  = new Bone(leftThigh, [0,   -1.5, 0  ], [0.1,  0.7, 0.1], [0, 0.7,  0   ], [1, 0, 0]);
    var leftFoot  = new Bone( leftShin, [0,   -0.9, 0.2], [0.15, 0.1, 0.3], [0, 0.1, -0.25], [1, 0, 0]);

    this.bones = [hip, leftThigh, leftShin, leftFoot];
}

Task4.prototype.setJointAngle = function(boneIndex, angle) {
    this.bones[boneIndex].setJointAngle(angle);
}

Task4.prototype.render = function(canvas, w, h) {
    var context = canvas.getContext('2d');
    clear(context, w, h);

    var cameraView = SimpleMatrix.rotate(this.cameraAngle, 1, 0, 0);
    var view = SimpleMatrix.translate(0, 0, -10);
    view = SimpleMatrix.multiply(view, cameraView);

    for (var i = 0; i < this.bones.length; ++i) {
        var boneTransform = new SimpleMatrix();

        // TODO: Calculate the correct transform for the bone.
        //       Hint: Use your view matrix and the computeModelMatrix method.

        this.mesh.render(canvas, boneTransform);
    }
}

Task4.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
