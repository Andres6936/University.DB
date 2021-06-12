export class Pair {
    #x = undefined
    #y = undefined

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    toString() {
        return "X: " + this.#x.toString() +
            ", Y: " + this.#y.toString();
    }

    get first() {
        return this.#x;
    }

    set first(x) {
        this.#x = x;
    }

    get second() {
        return this.#y;
    }

    set second(y) {
        this.#y = y;
    }
}
