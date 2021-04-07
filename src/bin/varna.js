#!/usr/bin/env node
/*
 *  Entrypoint executable for varna.
 *  Created On 01 April 2021
 */

import { Command } from 'commander'

import build from './cmds/build/index.js'
import render from './cmds/render/index.js'
import help from './help.js'
import loop from './loop.js'

const app = new Command()
    .name('varna')
    .addCommand(build)
    .addCommand(render)
    .helpOption('-h, --help', 'this message 🤷‍♂️')
    .option('-V, --verbose', 'show additional 🔬 output')
    .addHelpCommand(true, 'help 📖 for a given command')

await loop(app)
await help(app)
await app.parseAsync(process.argv)
