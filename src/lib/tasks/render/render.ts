/*
 *  Renders an SVG image to a given path.
 *  Created On 02 April 2021
 */

import cheerio from 'cheerio'
import sharp from 'sharp'

export default async ({
    svg,
    output,
    type,
    quality,
}: {
    svg: cheerio.Root
    output: string
    type: string
    quality: number
}): Promise<void> => {
    // render the image
    let img = await sharp(Buffer.from(svg('body').html()))

    // jpg... jpeg... 🙄
    if (type == 'jpg') type = 'jpeg'

    // run the rendering
    if (type == 'jpg') {
        img = img[type]({
            quality,
        })
    } else {
        img = img[type]()
    }

    // save it
    await img.toFile(output)
}
