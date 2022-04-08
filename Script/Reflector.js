class Reflector {
    constructor(refChar) {
    const RefB = Array.from("EJMZALYXVBWFCRQUONTSPIKHGD");
    const RefC = Array.from("YRUHQSLDPXNGOKMIEBFZCWVJAT");

    this.sub = (refChar == "B") ? RefB : RefC;
    }

    reflect(char, Alphabet) {
        var position = Alphabet.indexOf(char)
        return this.sub[position];
    }
}