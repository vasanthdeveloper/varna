/*
 *  Renders an SVG image to a given path.
 *  Created On 02 April 2021
 */

import cheerio from 'cheerio'
import sharp from 'sharp'

import { FileTypeEnum, OutputImpl } from './index.js'

export default async ({
    svg,
    output,
    type,
    quality,
}: {
    svg: cheerio.Root
    output: OutputImpl
    type: FileTypeEnum
    quality: number
}): Promise<Buffer | string> => {
    // render the image
    let img = await sharp(Buffer.from(svg('body').html()))

    // jpg or jpeg 🙄
    img['jpg'] = img['jpeg']

    // run the rendering
    if (type == FileTypeEnum.jpg || type == FileTypeEnum.webp) {
        img = img[type]({
            quality,
        })
    } else {
        img = img[type]()
    }

    // depending on which format the user wants
    if (output.type.toString() == 'path') {
        await img.toFile(output.path)
        return output.path
    } else if (output.type.toString() == 'bytes') {
        return await img.toBuffer()
    } else if (output.type.toString() == 'base64') {
        return await (await img.toBuffer()).toString('base64')
    }
}
