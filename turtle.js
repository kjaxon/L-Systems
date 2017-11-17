var Turtle = function(x, y, headAngle, context) {
    this.headAngle = headAngle;
    this.x = x;
    this.y = y;
    this.ctx = context;
    this.lastPosition = {
        x: this.x,
        y: this.y,
        headAngle: this.headAngle,
    };

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

Turtle.prototype.turnLeft = function(angle) {
    this.turn(angle);
}

Turtle.prototype.turnRight = function(angle) {
    this.turn(-angle);
}

Turtle.prototype.turn = function(angle) {
    this.headAngle += angle;
}

Turtle.prototype.push = function() {
    this.lastPosition = {
        x: this.x,
        y: this.y,
        headAngle: this.headAngle
    };
}

Turtle.prototype.pop = function() {
    this.x = this.lastPosition.x;
    this.y = this.lastPosition.y;
    this.headAngle = this.lastPosition.headAngle;
}