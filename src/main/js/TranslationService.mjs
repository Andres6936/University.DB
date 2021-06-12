import translate from "@iamtraction/google-translate";

export class TranslationService {

    /**
     * Translate the key and the value of pair.
     * @param pair {Pair} The Pair object.
     */
    static translatePair(pair) {
        translate(pair.first).then(res => {
            pair.first = res.text;
        });
        translate(pair.second).then(res => {
            pair.second = res.text;
        });
    }

    /**
     * Translate a array of Pair elements.
     * @param array {Array<Pair>} Array of Pair's.
     */
    static translateArrayPair(array) {
        for (const pair of array) {
            this.translatePair(pair);
        }
    }
}
