/// <reference types="node" />
import cheerio from 'cheerio';
import { FileTypeEnum, OutputImpl } from './index.js';
declare const _default: ({ svg, output, type, quality, }: {
    svg: cheerio.Root;
    output: OutputImpl;
    type: FileTypeEnum;
    quality: number;
}) => Promise<Buffer | string>;
export default _default;
