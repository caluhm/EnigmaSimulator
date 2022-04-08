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

function Main() {
    // Input
    var x = document.getElementById("plain-text-area").value;
    x = x.replace(/\s/g, '');
    x = x.replace(/[^a-zA-Z]/g,"");
    x = x.toUpperCase();
    var Input = Array.from(x);
    
    // Plugboard
    var Plug = setPlugboard();
    var Pb = new Plugboard(Plug)
    
    // Rotors
    var rotor1 = document.getElementById("right-choice").value;
    var fast;
    console.log("rotor1: " + rotor1)
    if (rotor1 === "I") {
        fast = new Rotor("I")
    }
    else if (rotor1 === "II") {
        fast = new Rotor("II")
    }
    else if (rotor1 === "III") {
        fast = new Rotor("III")
    }
    else if (rotor1 === "IV") {
        fast = new Rotor("IV")
    }
    else if (rotor1 === "V") {
        fast = new Rotor("V") 
    }
    
    var rotor2 = document.getElementById("middle-choice").value;
    var mid;
    console.log("rotor2: " + rotor2)
    if (rotor2 === "I") {
        mid = new Rotor("I")
    }
    else if (rotor2 === "II") {
        mid = new Rotor("II")
    }
    else if (rotor2 === "III") {
        mid = new Rotor("III")
    }
    else if (rotor2 === "IV") {
        mid = new Rotor("IV")
    }
    else if (rotor2 === "V") {
        mid = new Rotor("V")
    }
    
    var rotor3 = document.getElementById("left-choice").value;
    var slow;
    console.log("rotor3: " + rotor3)
    if (rotor3 === "I") {
        slow = new Rotor("I")
    }
    else if (rotor3 === "II") {
        slow = new Rotor("II")
    }
    else if (rotor3 === "III") {
        slow = new Rotor("II")
    }
    else if (rotor3 === "IV") {
        slow = new Rotor("IV")
    }
    else if (rotor3 === "V") {
        slow = new Rotor("V")
    }
    
    // Reflector
    var reflector = document.getElementById("reflector-choice").value;
    console.log("reflector: " + reflector)
    if (reflector === "B") {
        reflector = new Reflector("B")
    }
    else if (reflector === "C") {
        reflector = new Reflector("C")
    }
    
    // Enigma Function 
    var result = new Engima(Pb, fast, mid, slow, reflector, Alphabet)
    result = result.run(Input)
    
    // Output
    result = result.toString();
    result = result.replace(/,/g, '');
    document.getElementById("cypher-text-area").innerText = result;
}

function setPlugboard() {
    var x = document.getElementById("plugboard-text-area").value;
    x = x.replace(/\s/g, '');
    x = x.replace(/[^a-zA-Z]/g,"");
    x = x.toUpperCase();
    var str = Array.from(x);
    var finalStr = new Array(26)

    finalStr.fill(" ", 0, 26)

    for (i=0; i<str.length; i=i+2) {
        var item1 = str[i]
        var item2 = str[i+1]
        var position = Alphabet.indexOf(item1)
        finalStr[position] = item2
        position = Alphabet.indexOf(item2)
        finalStr[position] = item1
    }

    return finalStr;
}