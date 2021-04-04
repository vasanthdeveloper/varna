/*
 *  Builds a given template directory into a single file.
 *  Created On 02 April 2021
 */

import utilities from '@vasanthdeveloper/utilities'
import chalk from 'chalk'
import { Command } from 'commander'
import exeTime from 'execution-time'
import path from 'path'

import build from '../../../../dist/tasks/build/index.js'
import logger from '../../logger.js'

const performance = exeTime()

const action = async args => {
    // populate the defaults
    args.file = args.file || 'design'

    if (args.directory) {
        args.directory = path.resolve(args.directory)
    } else {
        const srcDir = path.join(process.cwd(), 'src')
        if (await utilities.fs.exists(srcDir)) {
            args.directory = srcDir
        } else {
            args.directory = process.cwd()
        }
    }

    args.output = args.output
        ? path.resolve(args.output)
        : path.join(process.cwd(), 'dist')

    // start performance indexing
    performance.start('build')

    const stats = await build({
        dir: args.directory,
        output: path.join(args.output, `${args.file}.varna`),
    })

    const { words: time } = performance.stop('build')
    logger.note(
        `Included ${stats.added.map(file => chalk.gray(file)).join(' ')}`,
    )
    logger.success(`Written to ${stats.output}`)
    logger.info(`🕖 Took ${time}`)
}

export default new Command()
    .name('build')
    .description('builds 🛠 a single-file template')
    .action(action)
    .option('-D, --directory <path>', 'directory 📂 to build from')
    .option('-F, --file <name>', 'file name ℹ️ without extension')
    .option('-O, --output <path>', 'path where the built file will be 💾 saved')
