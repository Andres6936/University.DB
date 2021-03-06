export class IScrapperService {
    constructor() {
    }

    /**
     * @param html The node with the content of page.
     * @return IScrapperService Instance of scrapper service.
     */
    parsePage(html) {
        throw new Error("Cannot instance a abstract class");
    }

    getTextByNode(node) {
        throw new Error("Cannot instance a abstract class");
    }

    /**
     * @param selector {string} The selector used for filter
     * @return Array<Object> The element that coincide with the selector
     */
    getElementsBySelector(selector) {
        throw new Error("Cannot instance a abstract class");
    }

    toText() {
        throw new Error("Cannot instance a abstract class");
    }

    toHTML() {
        throw new Error("Cannot instance a abstract class");
    }
}
