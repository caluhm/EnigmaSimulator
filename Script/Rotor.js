class Rotor {

    constructor(refChar) {
        const RefI = Array.from("EKMFLGDQVZNTOWYHXUSPAIBRCJ");
        const RefII = Array.from("AJDKSIRUXBLHWTMCQGZNPYFVOE");
        const RefIII = Array.from("BDFHJLCPRTXVZNYEIWGAKMUSQO");
        const RefIV = Array.from("ESOVPZJAYQUIRHXLNFTGKDCMWB");
        const RefV = Array.from("VZBRGITYUPSDNHLXAWMJQOFECK");

        const RotorsArr = [RefI, RefII, RefIII, RefIV, RefV];
        const Numerals = ["I", "II", "III", "IV", "V"];
        const ArrNum = Numerals.indexOf(refChar);

        this.sub = RotorsArr[ArrNum];
        
    }

    encrypt(char, query, Alphabet) {
        var newChar;
        if (query) {
            var position = Alphabet.indexOf(char)
            newChar = this.sub[position];
        } else {
            var position = this.sub.indexOf(char)
            newChar = Alphabet[position]
        }

        return newChar; 
    }

    rotate() {
        let temp = this.sub.pop();
        this.sub.unshift(temp);
    }   
}
