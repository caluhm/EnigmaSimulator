class Engima {
    constructor(Plugboard, FastRotor, MiddleRotor, SlowRotor, Reflector, Alphabet) {
        this.Plugboard = Plugboard
        this.Rotors = [SlowRotor, MiddleRotor, FastRotor];
        this.Reflector = Reflector;
        this.Alphabet = Alphabet;
    }

    run(Plaintext) {

        console.log("Plugboard: " + this.Plugboard.sub)
        console.log("Fast Rotor: " + this.Rotors[2].sub)
        console.log("Mid Rotor: " + this.Rotors[1].sub)
        console.log("Slow Rotor: " + this.Rotors[0].sub)
        console.log("Reflector: " + this.Reflector.sub)
        console.log("Engima Start")

        var Output = new Array;
        var countX = 0;
        var countY = 0;

        Plaintext.forEach(item => {
            console.log()
            console.log("Inital Char: " + item)

            // Forwards:

            // Plugboard
            item = this.Plugboard.encrypt(item, true, this.Alphabet)
            console.log("Char: " + item)
            
            // Rotors
            item = this.Rotors[2].encrypt(item, true, this.Alphabet)
            console.log("Char: " + item)
            item = this.Rotors[1].encrypt(item, true, this.Alphabet)
            console.log("Char: " + item)
            item = this.Rotors[0].encrypt(item, true, this.Alphabet)
            console.log("Char: " + item)
            
            // Reflector
            item = this.Reflector.reflect(item, this.Alphabet)
            console.log("Char: " + item)

            // Backwards:

            // Rotors
            item = this.Rotors[0].encrypt(item, false, this.Alphabet)
            console.log("Char: " + item)
            item = this.Rotors[1].encrypt(item, false, this.Alphabet)
            console.log("Char: " + item)
            item = this.Rotors[2].encrypt(item, false, this.Alphabet)
            console.log("Final Char: " + item)

            // Plugboard
            item = this.Plugboard.encrypt(item, false, this.Alphabet)
            console.log("Char: " + item)

            // Output

            Output.push(item);

            this.Rotors[2].rotate();
            countX = countX + 1;

            if (countX != 0 && countX % 26 === 0) {
                this.Rotors[1].rotate();
                countY = countY + 1;
            }

            if (countY != 0 && countY % 26 === 0 && countX % 676 === 0) {
                this.Rotors[0].rotate();
            }
    
        });

        console.log("Engima End")
        return Output;
    }   
}