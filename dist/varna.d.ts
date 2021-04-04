declare const _default: {
    build: ({ dir, output, }: {
        dir: string;
        output: string;
    }) => Promise<{
        output: string;
        added: string[];
    }>;
    render: ({ file, type, output, payload, quality, }: {
        type: string;
        file: string;
        payload: any;
        output: string;
        quality: number;
    }) => Promise<{
        output: string;
    }>;
};
export default _default;
