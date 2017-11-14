// TODO: store data and do all the computation such as production here.
// axiom should be a string, rules should be a dictionary, look at sketch.js to see how things are stored


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

    var R = rotateAroundAxisAtPoint(this.jointAxis, this.jointAngle, this.jointLocation);
    var T = SimpleMatrix.translate(this.position[0], this.position[1], this.position[2]);
    var pose = SimpleMatrix.multiply(T, R);

    //       If this.parent is not null, you should also apply the pose matrix of the parent
    //       to get a hierarchical transform.
    if (this.parent != null) {
      pose =  SimpleMatrix.multiply(this.parent.computePoseMatrix(), pose);
    }
    return pose;
}

Bone.prototype.computeModelMatrix = function() {
    var pose = new SimpleMatrix();
    var S = SimpleMatrix.scale(this.scale[0], this.scale[1], this.scale[2]);
    pose = SimpleMatrix.multiply(this.computePoseMatrix(), S);
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

        boneTransform = SimpleMatrix.multiply(view, this.bones[i].computeModelMatrix());
        
        this.mesh.render(canvas, boneTransform);
    }
}

Task4.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
