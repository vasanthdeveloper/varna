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
import { getFonts } from 'font-list';
import fs from 'fs/promises';
import path from 'path';
export const steps = {
    designSVG: (dir) => __awaiter(void 0, void 0, void 0, function* () {
        const svgPath = path.join(dir, 'design.svg');
        if ((yield utilities.fs.exists(svgPath)) == false)
            throw new Error(`A design.svg file does not exist`);
    }),
    checkFonts: (dir) => __awaiter(void 0, void 0, void 0, function* () {
        const svg = yield fs.readFile(path.join(dir, 'design.svg'), {
            encoding: 'utf-8',
        });
        let used = svg.match(/(?<=\bfont-family=")[^"]*/g) || [];
        used = used.concat(svg.match(/(?<=\bfont-family: )[^;]*/g) || []);
        used = used.map(font => font
            .replace(/[ ](?=[ ])|[^-_,A-Za-z0-9 ]+/g, '')
            .trim()
            .toLowerCase());
        const installed = (yield getFonts()).map(font => font
            .replace(/[ ](?=[ ])|[^-_,A-Za-z0-9 ]+/g, ' ')
            .trim()
            .toLowerCase());
        const not = [];
        for (const fonts of used) {
            const typefaces = fonts.split(',').map(font => font.trim());
            let matched = false;
            for (const font of typefaces) {
                if (matched == false) {
                    if (installed.includes(font))
                        matched = true;
                }
            }
            if (matched == false) {
                for (const font of typefaces) {
                    const words = font.split(' ');
                    for (const word of words) {
                        if (installed.join(' ').includes(word))
                            matched = true;
                    }
                }
            }
            not.push(typefaces[0]);
        }
        if (not.length > 0)
            throw new Error(`The fonts ${not.join(', ')} are missing`);
    }),
};
export default (dir) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(dir);
});
