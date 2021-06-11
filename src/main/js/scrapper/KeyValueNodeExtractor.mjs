import {WebScrappingService} from "./WebScrappingService.mjs";
import {Pair} from "../util/Pair.mjs";

export class KeyValueNodeExtractor {
    #nodes = []

    constructor(node) {
        const webScrapper = new WebScrappingService(node);
        const elements = webScrapper.getElementsBySelector('tr');
        for (const element of elements) {
            const keyPair = webScrapper.parsePage(element).getElementsBySelector('td');
            // Only process values with key : value
            if (keyPair.length === 2) {
                const keyString = webScrapper.getTextByNode(keyPair.get(0));
                const valueString = webScrapper.getTextByNode(keyPair.get(1));
                this.#nodes.push(new Pair(keyString, valueString));
            }
        }
    }

    toArray() {
        return this.#nodes;
    }
}
