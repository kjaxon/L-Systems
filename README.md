## L-Systems
By: Larissa Chen and Khalil Jackson

### Parametric L-Systems

`lsystem.js`

The L-systems we implemented are parametric l-systems which are defined by: 
* axiom 
* production rules 
* number of generations 
* length of unit draw 
* angle of rotation 
<br/> 

The user can define the axiom and production rules using the input text boxes in the GUI.
There are sliders to also define number of generations, length of unit draw, and angle rotation. 
Although the user can custom define an L-system, by adding an axiom, some production rules, and 
pressing the 'Make custom L-System' button, they can also use one of the already-defined popular
L-systems in the dropdown menu. Selecting one of these will load the parameters defined for that l-system from the 
`lsystemUtil.js` file. 

### Language 
The language for our model is as follows: 
* One ASCII char serves a symbol (multi-chars are not supported), excludes +, -, :, [,]
    * Example: "F", "A", "B", "1", ">"
* Production rules then are rules that have an axiom (one symbol) associated 
with a replacement string 
    * Example: "F: AB-C+F" 

### Turtle Graphics 
While the l-system, and its setup can be found in `lsystem.js`, the module that handles drawing is the 
`turtle` module found in `turtle`.js. This module draws according to the following language: 
* "F":  draw one unit length 
* "+": turn left 
* "-": turn right 
* "[": push position 
* "]": pop position 

### Stochastic Systems 
Our model also supports stochastic systems. That is, multiple rules can be defined for one symbol. 
Our model supports uniform probability in choosing which production rule is applied for one that symbol. 
Extending so that a user can define probabilty would be easy. We would just need to add a probability to 
the production rule in the list of production rules for that symbol. To illustrate the variety in 
stochastic system, one can increment the spinner to see the number of copies of the same stochastic system, and how it looks different. 

### Timed L-systems 
Although we didn't get to fully implement the timed l-systems because of time constraints, this would 
be a hopeful extension. We had thought a lot about the timed l-system. Each node in the l-system 
generation would have an initial age when it would start growing as well as a terminal age. When 
drawing we would draw the nodes that would be alive during that time `t`, another parameter in the parametric system. If time t
is between the initial age and terminal age, then we could lineraly interpolate the length of that 
node. 

