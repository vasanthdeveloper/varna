/*
 *  Renders a given single file, extracts it in-memory
 *  and returns a rendered image.
 *  Created On 02 April 2021
 */

import unpack from './packaging.js'
import transform from './transform.js'

export default async ({
    file,
    output,
    type,
    quality,
}: {
    file: string
    output: string
    type: string
    quality: number
}): Promise<void> => {
    // unpack the zip in memory
    await unpack(file)

    // do transformations to design.svg
    await transform()
}
