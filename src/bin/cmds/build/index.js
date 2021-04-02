/*
 *  Builds a given template directory into a single file.
 *  Created On 02 April 2021
 */

import { Command } from 'commander'
import path from 'path'

import build from '../../../../dist/tasks/build/index.js'

const action = async args => {
    // populate the defaults
    args.file = args.file || 'design'
    args.directory = args.directory
        ? path.resolve(args.directory)
        : process.cwd()
    args.output = args.output
        ? path.resolve(args.output)
        : path.join(process.cwd(), 'dist')

    const stats = await build({
        dir: args.directory,
        output: path.join(args.output, `${args.file}.varna`),
    })

    console.log(stats)
}

export default new Command()
    .name('build')
    .description('builds 🛠 a single-file template')
    .action(action)
    .option('-D, --directory <path>', 'directory 📂 to build from')
    .option('-F, --file <name>', 'file name ℹ️ without extension')
    .option('-O, --output <path>', 'path where the built file will be 💾 saved')
