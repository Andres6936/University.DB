export class Pair {
    #x = undefined
    #y = undefined

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    get first() {
        return this.x;
    }

    get second() {
        return this.y;
    }
}
