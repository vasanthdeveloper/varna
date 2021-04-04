var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import cheerio from 'cheerio';
import del from 'del';
import dirname from 'es-dirname';
import fs from 'fs/promises';
import { fs as mem } from 'memfs';
import mkdirp from 'mkdirp';
import { nanoid } from 'nanoid';
import path from 'path';
export default () => __awaiter(void 0, void 0, void 0, function* () {
    const svg = cheerio.load(mem.readFileSync('/design.svg', 'utf-8'));
    if (mem.existsSync('/transform.js')) {
        const dir = path.join(dirname(), '..', '..', '..', '.temp');
        const file = path.join(dir, `${nanoid(5)}.js`);
        yield mkdirp(dir);
        yield fs.writeFile(file, mem.readFileSync('/transform.js', 'utf-8'), {
            encoding: 'utf-8',
        });
        const { default: mod } = yield import(file);
        mod(svg);
        yield del(file, { force: true });
    }
    return svg;
});
