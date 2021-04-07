/*
 *  Renders a given single file, extracts it in-memory
 *  and returns a rendered image.
 *  Created On 02 April 2021
 */

import caching from './caching.js'
import data from './data.js'
import unpack from './packaging.js'
import render from './render.js'
import styles from './styles.js'
import transform from './transform.js'

export enum FileTypeEnum {
    png,
    jpg,
    webp,
}

export enum OutputTypeEnum {
    bytes,
    path,
    base64,
}

export interface OutputImpl {
    path?: string
    type: OutputTypeEnum
}

export default async ({
    file,
    type,
    output,
    quality,
    queryFn,
    cacheFn,
}: {
    file: string
    quality: number
    output: OutputImpl
    type: FileTypeEnum
    queryFn?: (query: string) => Promise<string>
    cacheFn?: (variable: string) => Promise<boolean>
}): Promise<{
    rendered?: string | Buffer
    cached: boolean
    variables: string[]
}> => {
    // unpack the zip in memory
    await unpack(file)

    // do transformations to design.svg
    const svg = await transform()

    // decide whether to proceed with rendering
    // or not by checking if values of any used
    // variables have changed
    if ((await caching(svg, cacheFn)) == false)
        return {
            cached: true,
            variables: [],
        }

    // add styles from styles.json
    await styles(svg)

    // inject the data
    const variables = await data(svg, queryFn)

    // render the output image
    const rendered = await render({
        svg,
        output,
        quality,
        type,
    })

    return {
        rendered,
        variables,
        cached: false,
    }
}
