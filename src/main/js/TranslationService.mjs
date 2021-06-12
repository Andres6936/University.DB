import translate from "@iamtraction/google-translate";

export class TranslationService {

    /**
     * Translate any text
     * @param text {string} The text to will be translated.
     * @return {Promise<string>} The text translated.
     */
    async translateText(text) {
        // Wait 1/2 second in each translation
        // Ref: https://stackoverflow.com/a/49139664
        await new Promise(resolve => setTimeout(resolve, 500));
        return (await translate(text, {to: 'en'})).text
    }

    /**
     * Translate the key and the value of pair.
     * @param pair {Pair} The Pair object.
     * @return {Pair} The Pair object translated.
     */
    async translatePair(pair) {
        pair.first = await this.translateText(pair.first);
        pair.second = await this.translateText(pair.second);
        return pair;
    }

    /**
     * Translate a array of Pair elements.
     * @param array {Array<Pair>} Array of Pair's.
     */
    async translateArrayPair(array) {
        const objects = []
        for (const pair of array) {
            objects.push(await this.translatePair(pair));
        }
        return objects;
    }
}
