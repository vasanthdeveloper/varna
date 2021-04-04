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
import { fs as mem } from 'memfs';
export default (file) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield utilities.fs.exists(file)) == false)
        throw new Error(`Didn't find a varna template`);
    const zip = new AdmZip(file);
    for (const file of zip.getEntries())
        mem.writeFileSync(`/${file.name}`, file.getData());
});
