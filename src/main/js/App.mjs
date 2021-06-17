import {WebScrappingService} from "./scrapper/WebScrappingService.mjs";
import {AcademicInformation} from "./scrapper/AcademicInformation.mjs";
import {PersonalInformation} from "./scrapper/PersonalInformation.mjs";
import {TranslationService} from "./TranslationService.mjs";
import {DatabaseManagerService} from "./DatabaseManagerService.mjs";
import {BrowserQuery} from "./search/BrowserQuery.mjs";

export class App {
    #translateObjects = false

    constructor(configurations) {
        this.#translateObjects = configurations?.translateObjects ?? false;
    }

    /**
     * Print all properties of object.
     * @param object The object to print.
     */
    static #printObject(object) {
        // The second argument alters the contents of the string before
        // returning it. The third argument specifies how many spaces to
        // use as white space for readability.
        console.log(JSON.stringify(object, null, 4));
    }

    static #printNodes(nodes) {
        for (const node of nodes) {
            console.log(node.toString());
        }
    }

    #translateNodes(nodes) {
        if (this.#translateObjects) {
            new TranslationService().translateArrayPair(nodes)
                .then(result => {
                    App.#printNodes(result);
                });
        }
    }

    static async #getListNamesProfessors() {
        const service = await new DatabaseManagerService().startUp()
        const professors = await service.getAllProfessors();
        const names = [];
        for (const professor of professors) {
            names.push(professor.Name);
        }
        await service.close()
        return names;
    }

    static #mergeMatrix(matrix) {
        const masterNode = {};
        for (const nodes of matrix) {
            for (const node of nodes) {
                masterNode[node.first] = node.second;
            }
        }
        return masterNode;
    }

    async #scrapperSite(html) {
        const webScrapper = new WebScrappingService(html);
        const tables = webScrapper.getElementsBySelector('tr');
        const matrix = [];
        for (const table of tables) {
            //@type {string} The text of node
            const text = webScrapper.parsePage(table).toText();
            if (text.includes('Sexo')) {
                const nodes = new PersonalInformation().start(table);
                this.#translateNodes(nodes);
                matrix.push(nodes);
            } else if (text.includes('Formación Académica')) {
                const nodes = new AcademicInformation().start(table);
                this.#translateNodes(nodes);
                matrix.push(nodes);
            }
        }
        return matrix;
    }

    async startUp() {
        const browserQuery = await new BrowserQuery().startUp();
        // const names = await App.#getListNamesProfessors();
        const names = (await App.#getListNamesProfessors()).slice(0, 3);
        for (const name of names) {
            const html = await browserQuery.getHtmlByQuery(name + ' site:https://scienti.colciencias.gov.co');
            const matrix = await this.#scrapperSite(html);
            const master = App.#mergeMatrix(matrix);
            master['Name'] = name;
            App.#printObject(master);
        }
        await browserQuery.close();
    }
}
