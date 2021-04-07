var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sharp from 'sharp';
import { FileTypeEnum } from './index.js';
export default ({ svg, output, type, quality, }) => __awaiter(void 0, void 0, void 0, function* () {
    let img = yield sharp(Buffer.from(svg('body').html()));
    img['jpg'] = img['jpeg'];
    if (type == FileTypeEnum.jpg || type == FileTypeEnum.webp) {
        img = img[FileTypeEnum[type]]({
            quality,
        });
    }
    else {
        img = img[FileTypeEnum[type]]();
    }
    if (output.type.toString() == 'path') {
        yield img.toFile(output.path);
        return output.path;
    }
    else if (output.type.toString() == 'bytes') {
        return yield img.toBuffer();
    }
    else if (output.type.toString() == 'base64') {
        return yield (yield img.toBuffer()).toString('base64');
    }
});
