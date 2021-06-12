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

    set first(x) {
        this.#x = x;
    }

    get second() {
        return this.y;
    }

    set second(y) {
        this.#y = y;
    }
}
