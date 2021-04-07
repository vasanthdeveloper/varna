/// <reference types="node" />
export declare enum FileTypeEnum {
    png = 0,
    jpg = 1,
    webp = 2
}
export declare enum OutputTypeEnum {
    bytes = 0,
    path = 1,
    base64 = 2
}
export interface OutputImpl {
    path?: string;
    type: OutputTypeEnum;
}
declare const _default: ({ file, type, output, quality, queryFn, cacheFn, }: {
    file: string;
    quality: number;
    output: OutputImpl;
    type: FileTypeEnum;
    queryFn?: (query: string) => Promise<string>;
    cacheFn?: (variable: string) => Promise<boolean>;
}) => Promise<{
    rendered?: string | Buffer;
    cached: boolean;
    variables: string[];
}>;
export default _default;
