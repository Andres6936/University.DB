import {KeyValueNodeExtractor} from "./KeyValueNodeExtractor.mjs";
import {NormalizeStringService} from "../NormalizeStringService.mjs";
import {TranslationService} from "../TranslationService.mjs";

export class PersonalInformation {
    start(node) {
        let nodes = new KeyValueNodeExtractor(node).toArray();
        for (const node of nodes) {
            let value = NormalizeStringService.removeExtraSpaces(node.second)
            value = NormalizeStringService.removeLineBreak(value);
            node.second = value;
        }
        return nodes;
        // new TranslationService().translateArrayPair(nodes)
        //     .then(result => {
        //         for (const object of result) {
        //             console.log(object.toString());
        //         }
        //     });
    }
}
