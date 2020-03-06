const { resolve } = require('path');

const DOWNLOAD_OUTPUT_PATH = resolve(__dirname, 'binaries');
const SELENOID_PATH = resolve(DOWNLOAD_OUTPUT_PATH, 'selenoid');
const SELENOID_CONFIG_PATH = resolve(DOWNLOAD_OUTPUT_PATH, 'browsers.json');
const CHROMEDRIVER_PATH = resolve(DOWNLOAD_OUTPUT_PATH, 'chromedriver');
const GECKODRIVER_PATH = resolve(DOWNLOAD_OUTPUT_PATH, 'geckodriver');
const OPERADRIVER_PATH = resolve(DOWNLOAD_OUTPUT_PATH, 'operadriver');

module.exports = {
  DOWNLOAD_OUTPUT_PATH,
  SELENOID_PATH,
  SELENOID_CONFIG_PATH,
  CHROMEDRIVER_PATH,
  GECKODRIVER_PATH,
  OPERADRIVER_PATH
}
