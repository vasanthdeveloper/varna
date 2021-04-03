/*
 *  Builds a compressed single file out
 *  of a template directory.
 *  Created On 02 April 2021
 */

import utilities from '@vasanthdeveloper/utilities'
import AdmZip from 'adm-zip'
import del from 'del'
import mkdirp from 'mkdirp'
import path from 'path'

const writeZip = (zip: AdmZip, output: string): Promise<void> =>
    new Promise((resolve, reject) => {
        zip.writeZip(output, err => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })

export default async ({
    dir,
    output,
}: {
    dir: string
    output: string
}): Promise<{ output: string; added: string[] }> => {
    // construct paths
    const paths = {
        svg: path.join(dir, 'design.svg'),
        transform: path.join(dir, 'transform.js'),
        styles: path.join(dir, 'styles.json'),
        data: path.join(dir, 'data.json'),
    }

    // make sure a design.svg exists
    if ((await utilities.fs.exists(paths.svg)) == false)
        throw new Error(`A design.svg doesn't exist in the given directory`)

    // create a new zip file
    const zip = new AdmZip()

    // add our files
    zip.addLocalFile(paths.svg)
    if (await utilities.fs.exists(paths.transform))
        zip.addLocalFile(paths.transform)
    if (await utilities.fs.exists(paths.styles)) zip.addLocalFile(paths.styles)
    if (await utilities.fs.exists(paths.data)) zip.addLocalFile(paths.data)

    // create the directories in case they don't exist
    await mkdirp(path.dirname(output))

    // delete the zip file incase it already exists
    await del(output)

    // write the zip file
    await writeZip(zip, output)

    // return some useful information
    return {
        output,
        added: zip.getEntries().map(entry => entry.name),
    }
}
