var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import data from './data.js';
import unpack from './packaging.js';
import render from './render.js';
import styles from './styles.js';
import transform from './transform.js';
export default ({ file, type, output, payload, quality, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield unpack(file);
    const svg = yield transform();
    yield styles(svg);
    yield data(svg, payload);
    yield render({
        svg,
        output,
        quality,
        type,
    });
    return {
        output,
    };
});
