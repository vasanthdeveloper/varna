/*
 *  Applies CSS styles using a styles.json to a given template.
 *  Created On 03 April 2021
 */

import cheerio from 'cheerio'
import { fs as mem } from 'memfs'

export default async (svg: cheerio.Root): Promise<void> => {
    if (mem.existsSync('/styles.json') == false) return

    const json = JSON.parse(
        mem.readFileSync('/styles.json', { encoding: 'utf-8' }) as string,
    )

    // loop through each object
    for (const selector of Object.keys(json)) {
        const elm = svg(selector)

        if (elm.length == 0) {
            // TODO: throw a warning that a selector is invalid
            continue
        }

        elm.css(json[selector])
    }
}
