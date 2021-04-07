/// <reference types="node" />
declare const _default: {
    build: ({ dir, output, }: {
        dir: string;
        output: string;
    }) => Promise<{
        output: string;
        added: string[];
    }>;
    render: ({ file, type, output, quality, queryFn, cacheFn, }: {
        file: string;
        quality: number;
        output: import("./tasks/render/index.js").OutputImpl;
        type: import("./tasks/render/index.js").FileTypeEnum;
        queryFn?: (query: string) => Promise<string>;
        cacheFn?: (variable: string) => Promise<boolean>;
    }) => Promise<{
        cached: boolean;
        variables: string[];
        type?: import("./tasks/render/index.js").OutputTypeEnum;
        rendered?: string | Buffer;
    }>;
};
export default _default;
