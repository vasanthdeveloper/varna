/*
 *  Injects data into a given template.
 *  Created On 03 April 2021
 */

import cheerio from 'cheerio'
import { fs as mem } from 'memfs'
import svgson from 'svgson'

const replace = async (
    value: string,
    queryFn: (query: string) => Promise<string>,
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
        const val = await queryFn(match.slice(1, -1))
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
    queryFn?: (query: string) => Promise<string>,
): Promise<void> => {
    const parsed = await replace(svg.value, queryFn)

    svg.value = parsed.value
    if (parsed.variables)
        parsed.variables.forEach(
            (variable, index) => (variables[variable] = parsed.values[index]),
        )

    // recursively traverse through all svg objects
    if (svg.children.length > 0)
        for (const child of svg.children) {
            Object.assign(variables, await traverse(child, variables, queryFn))
        }
}

export default async (
    svg: cheerio.Root,
    queryFn?: (query: string) => Promise<string>,
): Promise<string[]> => {
    // get a list of all variables
    const matches =
        (svg('body')
            .html()
            .match(/:([a-zA-Z.]+):/g) as string[]) || []

    // load the svg string into svgson
    const parsed = await svgson.parse(svg('body').html())

    // a temporary object to hold variables
    // in memory
    const variables = {}

    // if there's no queryFn, we use our own to read
    // the internal data.json file
    if (!queryFn) {
        if (mem.existsSync('/data.json') == true) {
            const data = JSON.parse(
                mem.readFileSync('/data.json', { encoding: 'utf-8' }) as string,
            )

            const queryFn = async (query: string): Promise<string> => {
                return data[query] || query
            }

            // simply pass on with the given queryFn
            await traverse(parsed, variables, queryFn)
        }
    } else {
        // simply pass on with the given queryFn
        await traverse(parsed, variables, queryFn)
    }

    // put back into cheerio's SVG
    svg('body').html(await svgson.stringify(parsed))

    return matches.map(match => match.slice(1, -1))
}
