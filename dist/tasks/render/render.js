var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
export default ({ dir, output, type, quality, }) => __awaiter(void 0, void 0, void 0, function* () {
    const paths = {
        svg: path.join(dir, 'design.svg'),
        transform: path.join(dir, 'transform.js'),
        styles: path.join(dir, 'styles.json'),
    };
    let img = yield sharp(Buffer.from(yield fs.readFile(paths.svg, { encoding: 'utf-8' })));
    if (type == 'jpg')
        type = 'jpeg';
    if (type == 'jpg') {
        img = img[type]({
            quality,
        });
    }
    else {
        img = img[type]();
    }
    yield img.toFile(output);
});
