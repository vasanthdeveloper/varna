/*
 *  Watches a given directory and re-builds during development.
 *  Created On 03 April 2021
 */

import { Command } from 'commander'

const action = async args => {
    console.log('do the watching')
}

export default new Command()
    .name('dev')
    .description('watch 🧐 and auto re-build')
    .action(action)
    .option('-D, --directory <path>', 'directory to watch', process.cwd())
