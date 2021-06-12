export class NormalizeStringService {
    static removeLineBreak(text) {
        // We can remove all line breaks by using a regex to match all the line breaks by writing:
        // str = str.replace(/(\r\n|\n|\r)/gm, "");
        // \r\n is the CRLF line break used by Windows.
        // \n is a LF line break used by everything else.
        // \r is a carriage return.
        // g gets all instances of the line breaks.
        // We replace them all with empty strings to remove them.
        return text.replace(/(\r\n|\n|\r)/gm, "");
    }

    static removeExtraSpaces(text) {
        // Remove any amount of spaces for a single space
        return text.replace(/\s+/g, ' ');
    }
}
