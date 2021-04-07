/*
 *  Takes a .varna file as input, and renders out an image.
 *  Created On 02 April 2021
 */

import utilities from '@vasanthdeveloper/utilities'
import chalk from 'chalk'
import { Command } from 'commander'
import exeTime from 'execution-time'
import path from 'path'

import render, { FileTypeEnum } from '../../../../dist/tasks/render/index.js'
import logger from '../../logger.js'

const performance = exeTime()

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

    // start performance indexing
    performance.start('render')

    // render the image
    const stats = await render({
        output: {
            type: 'path',
            path: args.output,
        },
        file: args.file,
        quality: args.quality,
        type: FileTypeEnum[args.type],
    })

    const { words: time } = performance.stop('render')
    logger.success(`Written to ${stats.rendered}`)
    logger.verbose(
        `Used variables ${stats.variables.map(el => chalk.gray(el)).join(' ')}`,
    )
    logger.info(`🕖 Took ${time}`)
}

export default new Command()
    .name('render')
    .description('renders an image ✨ from a single-file template')
    .action(action)
    .option('-f, --file <name>', 'file name ℹ️ to render')
    .option('-o, --output <path>', 'path where image will be 💾 saved')
    .option('-t, --type <image_type>', 'image format (png, webp, jpg)', 'jpg')
    .option('-q, --quality <number>', 'image quality (only applies to jpg)')
