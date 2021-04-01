/*
 *  Customizes the help text with ASCII art.
 *  Created On 02 April 2021
 */

import readPkg from 'read-pkg'

export const app = await readPkg()

const ascii = `

__   __  __ _  _ __  _ __    __ _
\\ \\ / / / _\` || '__|| '_ \\  / _\` |
 \\ V / | (_| || |   | | | || (_| |
  \\_/   \\__,_||_|   |_| |_| \\__,_|

`.trim()

const credits = `

Project home 👉 ${app.homepage}
Developed, designed & maintained by ${app.author.name}

`.trim()

export default async cmd => {
    if (cmd) {
        cmd.description(
            `d${app.description.substr(13, 48)}\n${app.description.substr(
                62,
                19,
            )}`,
        )
        cmd.addHelpText('beforeAll', `${ascii}\n`)
        cmd.addHelpText('afterAll', `\n${credits}`)

        return cmd
    } else {
        console.log(`${ascii}\n`)
    }
}
