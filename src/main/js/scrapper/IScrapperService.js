class IScrapperService {
    constructor(html) {
        this.page = html;
    }

    getElementsBySelector(selector) {
        throw new Error("Cannot instance a abstract class");
    }
}
