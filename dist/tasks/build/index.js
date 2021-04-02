var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import utilities from '@vasanthdeveloper/utilities';
import AdmZip from 'adm-zip';
import del from 'del';
import mkdirp from 'mkdirp';
import path from 'path';
const writeZip = (zip, output) => new Promise((resolve, reject) => {
    zip.writeZip(output, err => {
        if (err) {
            reject(err);
        }
        else {
            resolve();
        }
    });
});
export default ({ dir, output, }) => __awaiter(void 0, void 0, void 0, function* () {
    const designSVG = path.join(dir, 'design.svg');
    const transformJS = path.join(dir, 'transform.js');
    const stylesJSON = path.join(dir, 'styles.json');
    if ((yield utilities.fs.exists(designSVG)) == false)
        throw new Error(`A design.svg doesn't exist in the given directory`);
    const zip = new AdmZip();
    zip.addLocalFile(designSVG);
    if (yield utilities.fs.exists(transformJS))
        zip.addLocalFile(transformJS);
    if (yield utilities.fs.exists(stylesJSON))
        zip.addLocalFile(stylesJSON);
    yield mkdirp(path.dirname(output));
    yield del(output);
    yield writeZip(zip, output);
    return {
        output,
        added: zip.getEntries().map(entry => entry.name),
    };
});
