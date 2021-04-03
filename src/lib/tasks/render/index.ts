/*
 *  Renders a given single file, extracts it in-memory
 *  and returns a rendered image.
 *  Created On 02 April 2021
 */

import data from './data.js'
import unpack from './packaging.js'
import styles from './styles.js'
import transform from './transform.js'

export default async ({
    file,
    type,
    output,
    payload,
    quality,
}: {
    type: string
    file: string
    payload: any
    output: string
    quality: number
}): Promise<void> => {
    // unpack the zip in memory
    await unpack(file)

    // do transformations to design.svg
    const svg = await transform()

    // add styles from styles.json
    await styles(svg)

    // inject the data
    await data(svg, payload)
}
