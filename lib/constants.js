const { resolve } = require('path');
const { isWindows } = require('./utils');


const DOWNLOAD_OUTPUT_PATH = resolve(__dirname, '../', 'binaries');
const SELENOID_CONFIG_PATH = resolve(DOWNLOAD_OUTPUT_PATH, 'browsers.json');
const SELENOID_PATH = resolve(DOWNLOAD_OUTPUT_PATH, isWindows ? 'selenoid.exe' : 'selenoid');
const CHROMEDRIVER_PATH = resolve(DOWNLOAD_OUTPUT_PATH, isWindows ? 'chromedriver.exe' : 'chromedriver');
const GECKODRIVER_PATH = resolve(DOWNLOAD_OUTPUT_PATH, isWindows ? 'geckodriver.exe' : 'geckodriver');
const OPERADRIVER_PATH = resolve(DOWNLOAD_OUTPUT_PATH, isWindows ? 'operadriver.exe' : 'operadriver');

module.exports = {
  DOWNLOAD_OUTPUT_PATH,
  SELENOID_PATH,
  SELENOID_CONFIG_PATH,
  CHROMEDRIVER_PATH,
  GECKODRIVER_PATH,
  OPERADRIVER_PATH
}
