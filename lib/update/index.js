const { ensureDirExists, clearDirContent, latestBrowsersConfig } = require('../utils');
const { generateConfig } = require('./generateConfig');
const { downloadSelenoid } = require('./downloadSelenoid');
const { downloadChromedriver } = require('./downloadChromedriver');
const { downloadGeckodriver } = require('./downloadGeckodriver');
const { downloadOperadriver } = require('./downloadOperadriver');


module.exports = {
  update: async ({ downloadOutputPath, selenoidPath, selenoidConfigPath, chromedriverPath, geckodriverPath, operadriverPath }) => {
    await ensureDirExists(downloadOutputPath);
    await clearDirContent(downloadOutputPath);
    const driversInfo = await latestBrowsersConfig();
    await Promise.all([
      generateConfig({ filepath: selenoidConfigPath, chromedriverPath, geckodriverPath, operadriverPath }),
      downloadSelenoid(selenoidPath),
      downloadChromedriver(chromedriverPath, driversInfo),
      downloadOperadriver(operadriverPath, driversInfo),
      downloadGeckodriver(downloadOutputPath, geckodriverPath, driversInfo)
    ]);
  }
};


