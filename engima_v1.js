// Alphabet:
// ABCDEFGHIJKLMNOPQRSTUVWXYZ
const Alphabet = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z"
]

// Rotors:
const I = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
const II = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
const III = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
const IV = "ESOVPZJAYQUIRHXLNFTGKDCMWB";
const V = "VZBRGITYUPSDNHLXAWMJQOFECK";

// Reflectors:
const B = "EJMZALYXVBWFCRQUONTSPIKHGD";
const C = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

// Plugboard:
const Plugboard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//                 ABCDEFGHIJKLMNOPQRSTUVWXYZ

function Main() {
// Input
var x = document.getElementById("plain-text-area").value;
x = x.replace(/\s/g, '');
x = x.toUpperCase();
var Input = Array.from(x);

// Plugboard
var Plug = Array.from(Plugboard)

// Rotors
var rotor1 = document.getElementById("right-choice").value;
console.log("rotor1: " + rotor1)
if (rotor1 === "I") {
    rotor1 = Array.from(I)
}
else if (rotor1 === "II") {
    rotor1 = Array.from(II)
}
else if (rotor1 === "III") {
    rotor1 = Array.from(III)
}
else if (rotor1 === "IV") {
    rotor1 = Array.from(IV)
}
else if (rotor1 === "V") {
    rotor1 = Array.from(V) 
}

var rotor2 = document.getElementById("middle-choice").value;
console.log("rotor2: " + rotor2)
if (rotor2 === "I") {
    rotor2 = Array.from(I)
}
else if (rotor2 === "II") {
    rotor2 = Array.from(II)
}
else if (rotor2 === "III") {
    rotor2 = Array.from(III)
}
else if (rotor2 === "IV") {
    rotor2 = Array.from(IV)
}
else if (rotor2 === "V") {
    rotor2 = Array.from(V)
}

var rotor3 = document.getElementById("left-choice").value;
console.log("rotor3: " + rotor3)
if (rotor3 === "I") {
    rotor3 = Array.from(I)
}
else if (rotor3 === "II") {
    rotor3 = Array.from(II)
}
else if (rotor3 === "III") {
    rotor3 = Array.from(III)
}
else if (rotor3 === "IV") {
    rotor3 = Array.from(IV)
}
else if (rotor3 === "V") {
    rotor3 = Array.from(V)
}

// Reflector
var reflector = document.getElementById("reflector-choice").value;
console.log("reflector: " + reflector)
if (reflector === "B") {
    reflector = Array.from(B)
}
else if (reflector === "C") {
    reflector = Array.from(C)
}

// Enigma Function 
var result = Engima(Input, Plug, rotor1, rotor2, rotor3, reflector)

// Output
result = result.toString();
result = result.replace(/,/g, '');
document.getElementById("cypher-text-area").innerText = result;
}

function Engima(Input, Plugboard, Fast, Middle, Slow, Reflector) {
    console.log("Plaintext: " + Input)
    console.log("Plugboard: " + Plugboard)
    console.log("Fast Rotor: " + Fast)
    console.log("Middle Rotor: " + Middle)
    console.log("Slow Rotor: " + Slow)
    console.log("Reflector: " + Reflector)
    
    var Output = new Array;
    var countX = 0;
    var countY = 0;

    Input.forEach(item => {

        var char;
        console.log("Initial Char: " + item);

        // Forwards:

        // Plugboard Substitution
        char = SubstitutionForwards(item, Plugboard)
        console.log("Char: " + char);
        
        // Fast Rotor Substitution
        char = SubstitutionForwards(char, Fast)
        console.log("Char: " + char);

        // Rotate fast Rotor
        shiftRight(Fast);
        countX = countX + 1;
        console.log("Fast Rotor Count is: " + countX)
        console.log("Fast: " + Fast)
        
        // Middle Rotor Substitution
        char = SubstitutionForwards(char, Middle)
        console.log("Char: " + char);

        // Rotate middle rotor
        if (countX != 0 && countX % 26 === 0) {
            shiftRight(Middle);
            countY = countY + 1;
            console.log("Mid Rotor Count is: " + countY)
            console.log("Middle: " + Middle)
        }
        
        // Slow Rotor Substitution
        char = SubstitutionForwards(char, Slow)
        console.log("Char: " + char);

        // Rotate slow rotor
        if (countY != 0 && countY % 26 === 0 && countX % 676 === 0) {
            shiftRight(Slow);
            console.log("Slow: " + Slow)
        }
        
        // Reflector Substitution
        char = SubstitutionForwards(char, Reflector)
        console.log("Char: " + char);
       
        // Backwards:

        // Slow Rotor Substitution
        char = SubstitutionBackwards(char, Slow)
        console.log("Char: " + char);
        
        // Middle Rotor Substitution
        char = SubstitutionBackwards(char, Middle)
        console.log("Char: " + char);
        
        // Fast Rotor Substitution
        char = SubstitutionBackwards(char, Fast)
        console.log("Char: " + char);
        
        // Plugboard Substitution
        char = SubstitutionBackwards(char, Plugboard)
        console.log("Final Char: " + char);
        
        Output.push(char)
    });

    // Output
    console.log("Cyphertext: " + Output)
    return Output
}

function SubstitutionForwards(char, arr) {
    var position = Alphabet.indexOf(char)
    
    if (arr[position] === " ") {
        return char;
    }
    else {
    console.log("Char " + char + " Is at position " + position + " in the Alphabet " + Alphabet + " and becomes " + arr[position] + " in the array " + arr)
    return arr[position];
    } 
}

function SubstitutionBackwards(char, arr) {
    var position = arr.indexOf(char)
    
    if (position < 0) {
        return char;
    }
    else {
    console.log("Char " + char + " Is at position " + position + " in the Array " + arr + " and becomes " + Alphabet[position] + " in the alphabet " + Alphabet)
    return Alphabet[position];
    } 
}

function shiftRight(array){
    let temp = array.pop();
    array.unshift(temp);
    return array;
}

function setupPlugboard() {
    // find the position of the input box label in the alphabet
    // set this position in the plugboard to be equal to the input
    // find the position of the input in the alphabet
    // set this position in the plugboard to be equal to the input box label
    // set this input box of the orginal input to the original input box label
}