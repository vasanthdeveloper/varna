/*
 *  Let's the client decide whether to render a new image
 *  or not by providing an array of variables.
 *  Created On 06 April 2021
 */

import cheerio from 'cheerio'

export default async (
    svg: cheerio.Root,
    cacheFn?: (variable: string) => Promise<boolean>,
): Promise<boolean> => {
    // in the case where cacheFn isn't defined
    // we simply re-render every single time
    if (!cacheFn) return true

    let returnable = false

    const variables = svg('body')
        .html()
        .match(/:([a-zA-Z.]+):/g)
        .map(variable => variable.slice(1, -1))

    // in case there are no variables, we will update the image
    // on every tick
    if (!variables) return true

    for (const key of variables) {
        const chg = await cacheFn(key)
        if (chg == true) returnable = true
    }

    return returnable
}
