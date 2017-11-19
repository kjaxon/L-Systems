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

var isSymbol = function(character ){
    return character != "+" && character != "-"
        && character != "[" && character != "]";
}

var Lsystem = function(axiom, rules, angle, iterations) {
    this.axiom = axiom;
    this.rules = rules;
    this.angle =  angle;
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

Lsystem.prototype.rulesToStrings = function() {
    var lines = [];
    var arrow = " --> ";
    for (var symbol in this.rules) {
        if (this.rules[symbol] instanceof Array) {
            for (var i = 0; i < this.rules[symbol].length; i++) {
                var line = symbol;
                line += arrow;
                line += this.rules[symbol][i];
                lines.push(line);
            }
        } else {
            var line = symbol;
            line += arrow;
            line += this.rules[symbol];
            lines.push(line);
        }

    }
    return lines;
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
        } else if (type == "sb") {
            model = sb;
        } else if (type == "stoch1") {
            model = stoch1;
        }
        this.lsystem = new Lsystem(model.axiom, model.rules, model.angle, model.n);
        this.lsystem.generateString();
    }
}

LsystemSetup.prototype.setCustom  = function () {
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
        this.lsystem.draw(canvas, w, h);
        document.querySelector('.display-axiom').innerHTML = 'Axiom: ' + this.lsystem.axiom;
        document.querySelector('.display-rules').innerHTML = 'Rules: ';
        var lines = this.lsystem.rulesToStrings();
        for (var i = 0; i < lines.length; i++) {
            document.querySelector('.display-rules').innerHTML += "<div class='tab'> " + lines[i] + "</div>" ;
        }
        document.querySelector('.display-n').innerHTML = 'Iterations: ' + this.lsystem.iterations;
        document.querySelector('.display-length').innerHTML = 'Length: ' + this.lsystem.length;
        document.querySelector('.display-angle').innerHTML = 'Angle: ' + this.lsystem.angle;
    }
}

LsystemSetup.prototype.setAngle = function(angle) {
    if (this.lsystem != null) {
        this.lsystem.setAngle(angle);
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
