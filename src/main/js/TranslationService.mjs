import translate from "@iamtraction/google-translate";

export class TranslationService {

    /**
     * Translate any text
     * @param text {string} The text to will be translated.
     * @return {Promise<string>} The text translated.
     */
    async static $translateText(text) {
        return (await translate(text)).text
    }

    /**
     * Translate the key and the value of pair.
     * @param pair {Pair} The Pair object.
     * @return {Pair} The Pair object translated.
     */
    static translatePair(pair) {
        pair.first = this.$translateText(pair.first);
        pair.second = this.$translateText(pair.second);
        return pair;
    }

    /**
     * Translate a array of Pair elements.
     * @param array {Array<Pair>} Array of Pair's.
     */
    static translateArrayPair(array) {
        for (let pair of array) {
            pair = this.translatePair(pair);
        }
    }
}
