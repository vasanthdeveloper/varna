/*
 *  Renders an SVG image to a given path.
 *  Created On 02 April 2021
 */

import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

export default async ({
    dir,
    output,
    type,
    quality,
}: {
    dir: string
    output: string
    type: string
    quality: number
}): Promise<void> => {
    // compute the paths
    const paths = {
        svg: path.join(dir, 'design.svg'),
        transform: path.join(dir, 'transform.js'),
        styles: path.join(dir, 'styles.json'),
    }

    // render the image
    let img = await sharp(
        Buffer.from(await fs.readFile(paths.svg, { encoding: 'utf-8' })),
    )

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
