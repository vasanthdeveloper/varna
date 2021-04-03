/*
 *  Takes a .varna file as input, and renders out an image.
 *  Created On 02 April 2021
 */

import utilities from '@vasanthdeveloper/utilities'
import { Command } from 'commander'
import path from 'path'

import render from '../../../../dist/tasks/render/index.js'

const action = async args => {
    // populate the defaults
    if (args.file) {
        args.file = path.resolve(args.file)
    } else {
        const src = path.join(process.cwd(), 'dist', 'design.varna')
        if (await utilities.fs.exists(src)) {
            args.file = src
        } else {
            args.file = path.join(process.cwd(), 'design.varna')
        }
    }
    if (args.output) {
        args.output = path.resolve(args.output)
    } else {
        args.output = path.join(path.dirname(args.file), `design.${args.type}`)
    }
    args.quality ? args.quality : (args.quality = 80)

    // render the image
    await render(args)
}

export default new Command()
    .name('render')
    .description('renders an image ✨ from a single-file template')
    .action(action)
    .option('-F, --file <name>', 'file name ℹ️ to render')
    .option('-O, --output <path>', 'path where image will be 💾 saved')
    .option('-T, --type <image_type>', 'image format (png, webp, jpg)', 'jpg')
    .option('-Q, --quality <number>', 'image quality (only applies to jpg)')
