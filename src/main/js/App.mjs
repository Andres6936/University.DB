import axios from "axios";
import {WebScrappingService} from "./scrapper/WebScrappingService.mjs";
import {AcademicInformation} from "./scrapper/AcademicInformation.mjs";
import {PersonalInformation} from "./scrapper/PersonalInformation.mjs";

export class App {
    #translateObjects = false

    constructor(configurations) {
        this.#translateObjects = configurations?.translateObjects ?? false;
    }

    static #printNodes(nodes) {
        for (const node of nodes) {
            console.log(node);
        }
    }

    async startUp() {
        const html = (await axios.get('http://scienti.colciencias.gov.co:8081/cvlac/visualizador/generarCurriculoCv.do?cod_rh=0000494089', {responseEncoding: 'latin1'})).data
        const webScrapper = new WebScrappingService(html);
        const tables = webScrapper.getElementsBySelector('tr');
        for (const table of tables) {
            //@type {string} The text of node
            const text = webScrapper.parsePage(table).toText();
            if (text.includes('Par evaluador reconocido por Minciencias')) {
                const nodes = new PersonalInformation().start(table);
                App.#printNodes(nodes);
            } else if (text.includes('Formación Académica')) {
                const nodes = new AcademicInformation().start(table);
                App.#printNodes(nodes);
            }
        }
    }
}
