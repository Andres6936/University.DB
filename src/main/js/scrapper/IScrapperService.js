class IScrapperService {
    constructor(page) {
        this.page = page;
    }

    getElementsBySelector(selector) {
        throw new Error("Cannot instance a abstract class");
    }
}
