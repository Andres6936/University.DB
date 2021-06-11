import {WebScrappingService} from "./WebScrappingService.mjs";

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
                const node = new Map();
                node.set(keyString, valueString);
                this.#nodes.push(node);
            }
        }
    }

    toArray() {
        return this.#nodes;
    }
}
