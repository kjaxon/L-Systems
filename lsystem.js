// TODO: store data and do all the computation such as production here.
// axiom should be a string, rules should be a dictionary, look at sketch.js to see how things are stored
// var inputs = document.getElementById("allInputs");
var dict = {};
var axiom = "";
var angle = 90;
n = 4;

var isEmpty = function(obj) {
	return Object.keys(obj).length === 0;
}

var isLetter = function(character ){
    return character != "+" && character != "-"
        && character != "[" && character != "]";
}

var Lsystem = function(axiom, rules, angle, iterations) {
    this.axiom = axiom;
    this.rules = rules;
    this.angle = Math.PI/180 * angle;
    this.length = 2;
    this.lstring = "";
    this.iterations = iterations;
}

Lsystem.prototype.generateString = function() {
    var axiomAtLevel = this.axiom;
    for (var i = 0; i < this.iterations; i++) {
        var acc = "";
        for (var j  = 0; j < axiomAtLevel.length; j++) {
            var curr = axiomAtLevel.charAt(j);
            if (curr in this.rules) {
                acc+=this.rules[curr];
            } else {
                acc+=curr;
            }
        }
        axiomAtLevel = acc;
    }
    this.lstring = axiomAtLevel;
}


Lsystem.prototype.draw = function(canvas, w, h) {
    var context = canvas.getContext('2d');
    var turtle = new Turtle(w/2, h/2, 0,  context);
    for (var i = 0; i < this.lstring.length; i++) {
        var letter = this.lstring.charAt(i);
        if (letter == "+") {
            turtle.turnLeft(this.angle);
        } else if (letter == "-") {
            turtle.turnRight(this.angle);
        } else if (letter == "[") {
            turtle.push();
        } else if (letter == "]") {
            turtle.pop();
        } else if (isLetter(letter)){
            turtle.forward(this.length);
        }
    }
}

function setDefinedAxiom() {
	axiom = document.getElementById("ax").value;
}

function addDefinedRule() {
	var str = document.getElementById("pfunc").value;
	var splits = str.split(":");
	var axiom = splits[0];
	var rule = splits[1];
	dict[axiom] = rule;
}

//TODO:KHALIL add angle here
function setDefinedAngle() {
    if (this.lsystem != null) {
        // change lsystems angle here
    }

}
// TODO: add iterations here
function setDefinedIterations() {
    if (this.lsystem != null) {
        // change iterations of lsystem here
    }
}

var LsystemSetup = function(canvas) {
    this.lsystem = null;
}

LsystemSetup.prototype.setLsystem = function(type) {
    if (type != "own") {
        var model = null;
        if (type == "p1") {
            model = p1;
        } else if (type == "p2") {
            model = p2;
        } else if (type == "st") {
            model = st;
        }
        this.lsystem = new Lsystem(model.axiom, model.rules, model.angle, model.n);
    }
}

LsystemSetup.prototype.makeCustomRules  = function () {
    this.lsystem = new Lsystem(axiom, dict, angle, n);
}

LsystemSetup.prototype.reset = function() {
    dict = {};
    axiom = "";
    this.lsystem = null;
}

LsystemSetup.prototype.render = function(canvas, w, h) {

    var context = canvas.getContext('2d');
    clear(context, w, h);
    if (this.lsystem != null ) {
        this.lsystem.generateString();
        console.log(this.lsystem.rules);
        console.log(this.lsystem.axiom);
        this.lsystem.draw(canvas, w, h);
    }
}

LsystemSetup.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
