var Turtle = function(x, y, headAngle, context) {
    this.headAngle = headAngle;
    this.x = x;
    this.y = y;
    this.ctx = context;
    this.stack = [];

}

Turtle.prototype.forward = function(length) {
    var x0 = this.x;
    var y0 = this.y;
    this.x += length * Math.sin(this.headAngle);
    this.y -= length * Math.cos(this.headAngle);
    this.ctx.beginPath();
    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(this.x, this.y);
    this.ctx.stroke();
}

Turtle.prototype.turnLeft = function(angleInDegrees) {
    this.turn(-angleInDegrees);
}

Turtle.prototype.turnRight = function(angleInDegrees) {
    this.turn(angleInDegrees);
}

Turtle.prototype.turn = function(angleInDegrees) {
    var angleInRadians = Math.PI/180 * angleInDegrees;
    this.headAngle += angleInRadians;
}

Turtle.prototype.push = function() {
    this.stack.push({
        x: this.x,
        y: this.y,
        headAngle: this.headAngle
    });
}

Turtle.prototype.pop = function() {
    var lastPosition = this.stack.pop();
    this.x = lastPosition.x;
    this.y = lastPosition.y;
    this.headAngle = lastPosition.headAngle;
}