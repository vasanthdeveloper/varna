/*
 *  Loops through all commands and adds global options.
 *  Created On 07 April 2021
 */

export default async app => {
    for (const cmd of app.commands) {
        cmd.option('-V, --verbose', 'show additional 🔬 output')
    }
}
