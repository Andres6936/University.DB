import translate from "@iamtraction/google-translate";

export class TranslationService {

    /**
     * Translate the key and the value of pair.
     * @param pair {Pair} The Pair object.
     */
    async static translatePair(pair) {
        pair.first = await translate(pair.first).text;
        pair.second = await translate(pair.second).text;
    }

    /**
     * Translate a array of Pair elements.
     * @param array {Array<Pair>} Array of Pair's.
     */
    async static translateArrayPair(array) {
        for (const pair of array) {
            await this.translatePair(pair);
        }
    }
}
