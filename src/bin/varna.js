#!/usr/bin/env node
/*
 *  Entrypoint executable for varna.
 *  Created On 01 April 2021
 */

import { Command } from 'commander'

import doctor from './cmds/doctor/index.js'
import help from './help.js'

const app = new Command()
    .name('varna')
    .addCommand(doctor)
    .helpOption('-h, --help', 'this message 🤷‍♂️')
    .addHelpCommand(true, 'help 📖 for a given command')

help(app)
app.parse(process.argv)
