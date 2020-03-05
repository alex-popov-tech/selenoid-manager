#!/usr/bin/env node
const { SELENOID_PATH, SELENOID_CONFIG_PATH, CHROMEDRIVER_PATH, GECKODRIVER_PATH, OPERADRIVER_PATH } = require('../constants');
const { start } = require('../start');
const { update } = require('../update');

require('yargs')
  .command({
    command: 'start',
    alias: ['run', 'up'],
    desc: 'Start selenoid',
    handler: () => {
      try {
        start({ selenoidPath: SELENOID_PATH, configPath: SELENOID_CONFIG_PATH })
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }
    }
  })
  .command({
    command: 'update',
    desc: 'Update selenoid and drivers',
    handler: () => {
      try {
        update({ selenoid: SELENOID_PATH, selenoidConfig: SELENOID_CONFIG_PATH, chromedriver: CHROMEDRIVER_PATH, geckodriver: GECKODRIVER_PATH, operadriver: OPERADRIVER_PATH })
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }
    }
  })
  .strict().help()
  .argv;
