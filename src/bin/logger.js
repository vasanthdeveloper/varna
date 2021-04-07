/*
 *  Configuration for itivrutaha logger module.
 *  Created On 04 April 2021
 */

import chalk from 'chalk'
import itivrutaha from 'itivrutaha'

export default itivrutaha.createNewLogger({
    theme: `${chalk.gray.dim(':time')} ${chalk.gray.dim('•')} :type :message`,
    timeFormat: 'HH:MM:ss',
    verboseIdentifier: ['-V', '--verbose'],
})
