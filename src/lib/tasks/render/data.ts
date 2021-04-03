/*
 *  Injects data into a given template.
 *  Created On 03 April 2021
 */

import cheerio from 'cheerio'
import { fs as mem } from 'memfs'
import svgson from 'svgson'

const replace = async (
    value: string,
    data: any,
): Promise<{
    value: string
    values?: string[]
    variables?: RegExpMatchArray
}> => {
    const matches = value.match(/:([a-zA-Z.]+):/g)
    const values = []
    if (!matches)
        return {
            value,
        }

    // loop through each one of them and replace the strings
    for (const match of matches) {
        const val = data[match.slice(1, -1)] || match
        value = value.replace(match, val)
        values.push(val)
    }

    return {
        value,
        values,
        variables: matches,
    }
}

const traverse = async (
    svg: svgson.INode,
    variables: any,
    data: any,
): Promise<void> => {
    const parsed = await replace(svg.value, data)

    svg.value = parsed.value
    if (parsed.variables)
        parsed.variables.forEach(
            (variable, index) => (variables[variable] = parsed.values[index]),
        )

    // recursively traverse through all svg objects
    if (svg.children.length > 0)
        for (const child of svg.children) {
            Object.assign(variables, await traverse(child, variables, data))
        }
}

export default async (svg: cheerio.Root, data: unknown): Promise<void> => {
    // if no data was passed & no data.json was found we skip
    if (!data && mem.existsSync('/data.json') == false) return

    // data from arguments should override
    // the data.json file if found
    if (!data) {
        data = JSON.parse(
            mem.readFileSync('/data.json', { encoding: 'utf-8' }) as string,
        )
    }

    // load the svg string into svgson
    const parsed = await svgson.parse(svg('body').html())

    const variables = {}
    await traverse(parsed, variables, data)

    // put back into cheerio's SVG
    svg('body').html(await svgson.stringify(parsed))
}
