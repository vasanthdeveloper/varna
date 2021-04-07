var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import caching from './caching.js';
import data from './data.js';
import unpack from './packaging.js';
import render from './render.js';
import styles from './styles.js';
import transform from './transform.js';
export var FileTypeEnum;
(function (FileTypeEnum) {
    FileTypeEnum[FileTypeEnum["png"] = 0] = "png";
    FileTypeEnum[FileTypeEnum["jpg"] = 1] = "jpg";
    FileTypeEnum[FileTypeEnum["webp"] = 2] = "webp";
})(FileTypeEnum || (FileTypeEnum = {}));
export var OutputTypeEnum;
(function (OutputTypeEnum) {
    OutputTypeEnum[OutputTypeEnum["bytes"] = 0] = "bytes";
    OutputTypeEnum[OutputTypeEnum["path"] = 1] = "path";
    OutputTypeEnum[OutputTypeEnum["base64"] = 2] = "base64";
})(OutputTypeEnum || (OutputTypeEnum = {}));
export default ({ file, type, output, quality, queryFn, cacheFn, }) => __awaiter(void 0, void 0, void 0, function* () {
    yield unpack(file);
    const svg = yield transform();
    if ((yield caching(svg, cacheFn)) == false)
        return {
            cached: true,
            variables: [],
        };
    yield styles(svg);
    const variables = yield data(svg, queryFn);
    const rendered = yield render({
        svg,
        output,
        quality,
        type,
    });
    return {
        rendered,
        variables,
        cached: false,
        type: output.type,
    };
});
