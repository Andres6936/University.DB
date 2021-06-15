import axios from "axios";
import {WebScrappingService} from "./scrapper/WebScrappingService.mjs";
import {AcademicInformation} from "./scrapper/AcademicInformation.mjs";
import {PersonalInformation} from "./scrapper/PersonalInformation.mjs";
import {TranslationService} from "./TranslationService.mjs";
import {DatabaseManagerService} from "./DatabaseManagerService.mjs";

export class App {
    #translateObjects = false

    constructor(configurations) {
        this.#translateObjects = configurations?.translateObjects ?? false;
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

    async startUp() {
        const names = await App.#getListNamesProfessors();
        console.log(names)
        return;

        const html = (await axios.get('http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000494089', {responseEncoding: 'latin1'})).data
        const webScrapper = new WebScrappingService(html);
        const tables = webScrapper.getElementsBySelector('tr');
        for (const table of tables) {
            //@type {string} The text of node
            const text = webScrapper.parsePage(table).toText();
            if (text.includes('Par evaluador reconocido por Minciencias')) {
                const nodes = new PersonalInformation().start(table);
                App.#printNodes(nodes);
                this.#translateNodes(nodes);
            } else if (text.includes('Formación Académica')) {
                const nodes = new AcademicInformation().start(table);
                App.#printNodes(nodes);
                this.#translateNodes(nodes);
            }
        }
    }
}
