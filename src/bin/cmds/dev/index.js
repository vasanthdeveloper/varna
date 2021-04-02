/*
 *  Watches a given directory and re-builds during development.
 *  Created On 03 April 2021
 */

import utilities from '@vasanthdeveloper/utilities'
import chokidar from 'chokidar'
import { Command } from 'commander'
import path from 'path'

import build from '../../../../dist/tasks/build/index.js'

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

    // do the initial build
    const stats = await build({
        dir: args.directory,
        output: path.join(args.output, `${args.file}.varna`),
    })

    console.log(stats)

    // construct files paths
    const paths = [
        path.join(args.directory, 'design.svg'),
        path.join(args.directory, 'transform.js'),
        path.join(args.directory, 'styles.json'),
    ]

    // attach chokidar fs watcher
    chokidar
        .watch(paths, {
            ignoreInitial: true,
        })
        .on('all', async () => {
            // do a re-build
            const stats = await build({
                dir: args.directory,
                output: path.join(args.output, `${args.file}.varna`),
            })

            console.log(stats)
        })
}

export default new Command()
    .name('dev')
    .description('watch 🧐 and auto re-build')
    .action(action)
    .option('-D, --directory <path>', 'directory 📂 to build from')
    .option('-F, --file <name>', 'file name ℹ️ without extension')
    .option('-O, --output <path>', 'path where the built file will be 💾 saved')
