declare const _default: {
    build: ({ dir, output, }: {
        dir: string;
        output: string;
    }) => Promise<{
        output: string;
        added: string[];
    }>;
    render: ({ file, output, type, quality, }: {
        file: string;
        output: string;
        type: string;
        quality: number;
    }) => Promise<void>;
};
export default _default;
