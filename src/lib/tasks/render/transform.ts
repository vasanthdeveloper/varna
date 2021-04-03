/*
 *  Run JavaScript & style transformations to design.svg
 *  Created On 02 April 2021
 */

import cheerio from 'cheerio'
import del from 'del'
import dirname from 'es-dirname'
import fs from 'fs/promises'
import { fs as mem } from 'memfs'
import mkdirp from 'mkdirp'
import { nanoid } from 'nanoid'
import path from 'path'

export default async (): Promise<cheerio.Root> => {
    // read design.svg code and load into parser
    const svg = cheerio.load(mem.readFileSync('/design.svg', 'utf-8'))

    // if there's a transform.js load it!
    if (mem.existsSync('/transform.js')) {
        // write the javascript file in a temp directory
        const dir = path.join(dirname(), '..', '..', '..', '.temp')
        const file = path.join(dir, `${nanoid(5)}.js`)

        await mkdirp(dir)
        await fs.writeFile(file, mem.readFileSync('/transform.js', 'utf-8'), {
            encoding: 'utf-8',
        })

        const { default: mod } = await import(file)
        mod(svg)

        await del(file, { force: true })
    }

    // return the loaded SVG
    return svg
}
