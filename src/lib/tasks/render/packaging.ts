/*
 *  Code for unpacking the ZIP archive & cleaning up later.
 *  Created On 02 April 2021
 */

import utilities from '@vasanthdeveloper/utilities'
import AdmZip from 'adm-zip'
import { fs as mem } from 'memfs'

export default async (file: string): Promise<void> => {
    // check if the .varna file exists
    if ((await utilities.fs.exists(file)) == false)
        throw new Error(`Didn't find a varna template`)

    // extract the zip file
    const zip = new AdmZip(file)

    // loop through and extract all files
    for (const file of zip.getEntries())
        mem.writeFileSync(`/${file.name}`, file.getData())
}
