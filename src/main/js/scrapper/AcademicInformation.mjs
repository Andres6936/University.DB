import {KeyValueNodeExtractor} from "./KeyValueNodeExtractor.mjs";
import {NormalizeStringService} from "../NormalizeStringService.mjs";

export class AcademicInformation {
    start(node) {
        let nodes = new KeyValueNodeExtractor(node).toArray();
        for (const node of nodes) {
            node.first = node.second.substr(0, node.second.indexOf('\n'));
            node.first = NormalizeStringService.mergeSlash(node.first);
            let value = NormalizeStringService.removeExtraSpaces(node.second)
            value = NormalizeStringService.removeLineBreak(value);
            node.second = value;
        }
        return nodes;
    }
}
