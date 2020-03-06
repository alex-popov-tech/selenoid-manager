#!/usr/bin/env node
const { DOWNLOAD_OUTPUT_PATH, SELENOID_PATH, SELENOID_CONFIG_PATH, CHROMEDRIVER_PATH, GECKODRIVER_PATH, OPERADRIVER_PATH } = require('../constants');
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
        update({ downloadOutputPath: DOWNLOAD_OUTPUT_PATH, selenoidPath: SELENOID_PATH, selenoidConfigPath: SELENOID_CONFIG_PATH, chromedriverPath: CHROMEDRIVER_PATH, geckodriverPath: GECKODRIVER_PATH, operadriverPath: OPERADRIVER_PATH })
      } catch (err) {
        console.error(err.message);
        process.exit(1);
      }
    }
  })
  .strict().help()
  .argv;
