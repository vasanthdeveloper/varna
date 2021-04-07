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
import svgson from 'svgson';
const replace = (value, queryFn) => __awaiter(void 0, void 0, void 0, function* () {
    const matches = value.match(/:([a-zA-Z.]+):/g);
    const values = [];
    if (!matches)
        return {
            value,
        };
    for (const match of matches) {
        const val = yield queryFn(match.slice(1, -1));
        value = value.replace(match, val);
        values.push(val);
    }
    return {
        value,
        values,
        variables: matches,
    };
});
const traverse = (svg, variables, queryFn) => __awaiter(void 0, void 0, void 0, function* () {
    const parsed = yield replace(svg.value, queryFn);
    svg.value = parsed.value;
    if (parsed.variables)
        parsed.variables.forEach((variable, index) => (variables[variable] = parsed.values[index]));
    if (svg.children.length > 0)
        for (const child of svg.children) {
            Object.assign(variables, yield traverse(child, variables, queryFn));
        }
});
export default (svg, queryFn) => __awaiter(void 0, void 0, void 0, function* () {
    const matches = svg('body')
        .html()
        .match(/:([a-zA-Z.]+):/g) || [];
    const parsed = yield svgson.parse(svg('body').html());
    const variables = {};
    if (!queryFn) {
        if (mem.existsSync('/data.json') == true) {
            const data = JSON.parse(mem.readFileSync('/data.json', { encoding: 'utf-8' }));
            const queryFn = (query) => __awaiter(void 0, void 0, void 0, function* () {
                return data[query] || query;
            });
            yield traverse(parsed, variables, queryFn);
        }
    }
    else {
        yield traverse(parsed, variables, queryFn);
    }
    svg('body').html(yield svgson.stringify(parsed));
    return matches.map(match => match.slice(1, -1));
});
