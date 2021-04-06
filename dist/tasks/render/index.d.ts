declare const _default: ({ file, type, output, payload, quality, queryFn, }: {
    type: string;
    file: string;
    payload: any;
    output: string;
    quality: number;
    queryFn?: (query: string) => Promise<string>;
}) => Promise<{
    output: string;
}>;
export default _default;
