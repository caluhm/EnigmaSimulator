class Plugboard {
    constructor(refString) {
        this.sub = refString
    }

    encrypt(char, query, Alphabet) {
        var newChar;
        if (query) {
            var position = Alphabet.indexOf(char)

            if (this.sub[position] === " ") {
                return char;
            }
            else {
                return this.sub[position];
            } 
        } else {
            var position = this.sub.indexOf(char)
    
            if (position < 0) {
                return char;
            }
            else {
                return Alphabet[position];
            } 
        }
    }
}