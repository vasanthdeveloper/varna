declare const _default: {
    build: ({ dir, output, }: {
        dir: string;
        output: string;
    }) => Promise<{
        output: string;
        added: string[];
    }>;
    render: ({ file, type, output, quality, queryFn, cacheFn, }: {
        type: string;
        file: string;
        output: string;
        quality: number;
        queryFn?: (query: string) => Promise<string>;
        cacheFn?: (variable: string) => Promise<boolean>;
    }) => Promise<{
        output?: string;
        cached: boolean;
    }>;
};
export default _default;
