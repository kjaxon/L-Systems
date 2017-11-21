// TODO: store data and do all the computation such as production here.
// axiom should be a string, rules should be a dictionary, look at sketch.js to see how things are stored
// var inputs = document.getElementById("allInputs");
var dict = {};
var axiom = "";
var angle = 90;
n = 2;

var isEmpty = function(obj) {
	return Object.keys(obj).length === 0;
}

var isSymbol = function(character){
    return character != "+" && character != "-"
        && character != "[" && character != "]";
}

var Lsystem = function(axiom, rules, angle, iterations, offsetx, offsety) {
    this.axiom = axiom;
    this.rules = rules;
    this.angle =  angle;
    this.length = 2;
    this.lstring = "";
    this.iterations = iterations;
    this.randomAngle = false;
    this.offsetx = offsetx;
    this.offsety = offsety;
}

Lsystem.prototype.generateString = function() {
    var axiomAtLevel = this.axiom;
    for (var i = 0; i < this.iterations; i++) {
        var acc = "";
        for (var j  = 0; j < axiomAtLevel.length; j++) {
            var curr = axiomAtLevel.charAt(j);
            if (isSymbol(curr)) {
                if (curr in this.rules) {
                    // account for stochastic or not
                    if (this.rules[curr] instanceof Array) {
                        acc += this.getStochasticRule(curr);
                    } else {
                        acc+=this.rules[curr];
                    }
                    continue;
                }
            }
            acc+=curr;
        }
        axiomAtLevel = acc;
    }
    this.lstring = axiomAtLevel;
}

Lsystem.prototype.getStochasticRule = function(symbol) {
    var index =  Math.floor((Math.random()*this.rules[symbol].length));
    return this.rules[symbol][index];
}

Lsystem.prototype.copy = function() {
    return new Lsystem(this.axiom, this.rules, this.angle, this.iterations, this.offsetx, this.offsety);
}

function rulesToString(rules) {
    var lines = [];
    var arrow = " --> ";
    for (var symbol in rules) {
        if (rules[symbol] instanceof Array) {
            for (var i = 0; i < rules[symbol].length; i++) {
                var line = symbol;
                line += arrow;
                line += rules[symbol][i];
                lines.push(line);
            }
        } else {
            var line = symbol;
            line += arrow;
            line += rules[symbol];
            lines.push(line);
        }

    }
    return lines;
}

Lsystem.prototype.draw = function(canvas, w, h) {
    var context = canvas.getContext('2d');
    var turtle = new Turtle(w + this.offsetx, h + this.offsety, 0,  context);
    for (var i = 0; i < this.lstring.length; i++) {
        var letter = this.lstring.charAt(i);
        var angle = this.randomAngle ? Math.floor(Math.random() * 360) : this.angle;
        if (letter == "+") {
            turtle.turnLeft(angle);
        } else if (letter == "-") {
            turtle.turnRight(angle);
        } else if (letter == "[") {
            turtle.push();
        } else if (letter == "]") {
            turtle.pop();
        } else if (isSymbol(letter)){
            turtle.forward(this.length);
        }
    }
}

function setCustomAxiom() {
	axiom = document.getElementById("ax").value;
}

function setCustomStochasticAxiom() {
    axiom = document.getElementById("ax-stochastic").value;
}

function addCustomRule() {
    var str = document.getElementById("pfunc").value;
    var splits = str.split(":");
    var axiom = splits[0];
    var rule = splits[1];
    dict[axiom] = rule;
}

function addCustomStochasticRule() {
    var str = document.getElementById("pfunc-stochastic").value;
    var splits = str.split(":");
    var axiom = splits[0];
    var rule = splits[1];
    if (! axiom in dict ) {
        dict[axiom] = [rule];
    } else {
        dict[axiom].push(rule);
    }
}

Lsystem.prototype.setAngle = function(angle){
    this.angle = angle;
}

Lsystem.prototype.setLength = function(n){
    this.length = n;
}

Lsystem.prototype.setIterations = function(n){
    this.iterations = n;
    console.log(n);
    this.generateString();
}

var LsystemSetup = function(canvas) {
    this.lsystem = null;
    this.instances = [];
}

LsystemSetup.prototype.setLsystem = function(type) {
    if (type != "own") {
        var model = null;
        if (type == "koch") {
            model = koch;
        } else if (type == "p2") {
            model = p2;
        } else if (type == "st") {
            model = st;
        } else if (type == "tree1") {
            model = tree1;
        } else if (type == "tree2") {
            model = tree2;
        } else if (type == "tree3") {
            model = tree3;
        } else if (type == "tree4") {
            model = tree4;
        } else if (type == "sb") {
            model = sb;
        } else if (type == "stoch1") {
            model = stoch1;
        }
        this.lsystem = new Lsystem(model.axiom, model.rules, model.angle, model.n, model.offsetx, model.offsety);
        this.lsystem.generateString();
    }
}

LsystemSetup.prototype.setCustom  = function () {
<<<<<<< HEAD
	if (document.getElementById("randomAngle").checked) {
		var randAngle = Math.floor((Math.random() * 360) + 1);
		this.lsystem = new Lsystem(axiom, dict, randAngle, n);
	} else {
    this.lsystem = new Lsystem(axiom, dict, angle, n);
	}
=======
    this.lsystem = new Lsystem(axiom, dict, angle, n, 0, 0);
>>>>>>> cc0d6d349e39a8e720a250e96a6081a5df9528f1
}

LsystemSetup.prototype.reset = function() {
    dict = {};
    axiom = "";
    this.lsystem = null;
    this.instances = [];
}

LsystemSetup.prototype.render = function(canvas, w, h) {

    var context = canvas.getContext('2d');
    clear(context, w, h);
    if (this.lsystem != null) {
        var noOfCopies = document.getElementById("instances").value;
        if (noOfCopies > 1) {
            if (this.instances.length == 0) {
                this.instances.push(this.lsystem);
            }
            for (var i = this.instances.length; i < noOfCopies; i++) {
                var copy = this.lsystem.copy();
                copy.generateString();
                this.instances.push(copy);
            }
            var incrementx = w/(this.instances.length + 1);
            for (var i = 0; i < this.instances.length; i++) {
                this.instances[i].draw(canvas, (i + 1) * incrementx, h/2);
            }
        } else {
            this.instances = [];
            this.lsystem.draw(canvas, w/2, h/2);
        }
    }
    var axiomString = this.lsystem != null ? this.lsystem.axiom : axiom;
    var nString = this.lsystem != null ? this.lsystem.iterations : 0;
    var lengthString = this.lsystem != null ? this.lsystem.length : 0;
    var angleString = this.lsystem != null ? this.lsystem.angle : 0;
    var lines = this.lsystem != null ? rulesToString(this.lsystem.rules) : rulesToString(dict);
    document.querySelector('.display-axiom').innerHTML = 'Axiom: ' + axiomString;
    document.querySelector('.display-rules').innerHTML = 'Rules: '
    for (var i = 0; i < lines.length; i++) {
        document.querySelector('.display-rules').innerHTML += "<div class='tab'> " + lines[i] + "</div>" ;
    }

    document.querySelector('.display-n').innerHTML = 'Iterations: ' + nString;
    document.querySelector('.display-length').innerHTML = 'Length: ' + lengthString;
    document.querySelector('.display-angle').innerHTML = 'Angle: ' + angleString;
}

LsystemSetup.prototype.setAngle = function(angle) {
    if (this.lsystem != null) {
        this.lsystem.setAngle(angle);
    }
}

LsystemSetup.prototype.setRandomAngle = function(cb) {
    if (this.lsystem != null) {
        this.lsystem.randomAngle = cb.checked;
    }
}

LsystemSetup.prototype.setLength = function(n) {
    if (this.lsystem != null) {
        this.lsystem.setLength(n);
    }
}

LsystemSetup.prototype.setIterations = function(n) {
    if (this.lsystem != null) {
        this.lsystem.setIterations(n);
    }
}

LsystemSetup.prototype.dragCamera = function(dy) {
    this.cameraAngle = Math.min(Math.max(this.cameraAngle + dy*0.5, -90), 90);
}
