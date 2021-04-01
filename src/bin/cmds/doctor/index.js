/*
 *  Runs the doctor() on the current directory.
 *  Created On 02 April 2021
 */

import { Command } from 'commander'

const action = args => {
    console.log(args)
}

export default new Command()
    .name('doctor')
    .description('validates 🏥 the template in the current directory')
    .action(action)
    .option('-D, --directory <path>', 'directory to run validations in')
