var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fs as mem } from 'memfs';
export default (svg) => __awaiter(void 0, void 0, void 0, function* () {
    if (mem.existsSync('/styles.json') == false)
        return;
    const json = JSON.parse(mem.readFileSync('/styles.json', { encoding: 'utf-8' }));
    for (const selector of Object.keys(json)) {
        const elm = svg(selector);
        if (elm.length == 0) {
            continue;
        }
        elm.css(json[selector]);
    }
});
