var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default (svg, cacheFn) => __awaiter(void 0, void 0, void 0, function* () {
    if (!cacheFn)
        return true;
    let returnable = false;
    const variables = svg('body')
        .html()
        .match(/:([a-zA-Z.]+):/g)
        .map(variable => variable.slice(1, -1));
    if (!variables)
        return true;
    for (const key of variables) {
        const chg = yield cacheFn(key);
        if (chg == true)
            returnable = true;
    }
    return returnable;
});
