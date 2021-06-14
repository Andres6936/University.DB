import {strict as assert} from 'assert';
import {NormalizeStringService} from "../../main/js/NormalizeStringService.mjs";

assert.deepEqual(NormalizeStringService.mergeSlash('Doctorado'), 'Doctorado');
assert.deepEqual(NormalizeStringService.mergeSlash('Maestría/Magister'), 'Maestría');
assert.deepEqual(NormalizeStringService.mergeSlash('Pregrado/Universitario'), 'Pregrado');
