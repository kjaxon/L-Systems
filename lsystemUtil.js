var treeOffsety = 250;
var koch = {
    axiom: "F-F-F-F ",
    rules: {
        "F": "FF-F-F-F-F-F+F"
    },
    angle: 90,
    n: 4,
    offsetx: 0,
    offsety:0
};

var p2 =  {
    axiom: "F-F-F-F ",
    rules: {
        "F": "FF-F-F-F-FF"
    },
    angle: 90,
    n: 4,
    offsetx: 0,
    offsety:0
};


var st = {
    axiom: "R",
    rules: {
        "F": "R+F+R",
        "R": "F-R-F"
    },
    angle: 60,
    n: 6,
    offsetx: 0,
    offsety:0
}

var sb = {
    axiom: "F",
    rules: {
        "F": "F[+F]F[-F]F"
    },
    angle: 30,
    n: 5,
    offsetx: 0,
    offsety:treeOffsety
}

var tree1 = {
    axiom: "F",
    rules: {
        "F": "F[+F]F[-F]F"
    },
    angle: 25.7,
    n: 5,
    offsetx: 0,
    offsety:treeOffsety
}

var tree2 = {
    axiom: "F",
    rules: {
        "F": "F[+F]F[-F][F]"
    },
    angle: 20,
    n: 5,
    offsetx: 0,
    offsety:treeOffsety
}

var tree3 = {
    axiom: "X",
    rules: {
        "X": "F-[[X]+X]+F[+FX]-X",
        "F": "FF"
    },
    angle: 22.5,
    n: 5,
    offsetx: 0,
    offsety:treeOffsety
}

var tree4 = {
    axiom: "X",
    rules: {
        "X": "F[+X][-X]FX",
        "F": "FF"
    },
    angle: 25.7,
    n: 7,
    offsetx: 0,
    offsety:treeOffsety
}

var stoch1 = {
    axiom: "F",
    rules: {
        "F": [
            "F[+F]F[-F]F",
            "F[+F]F",
            "F[-F]F"
        ]
    },
    angle: 20,
    n: 5,
    offsetx: 0,
    offsety:treeOffsety
}

