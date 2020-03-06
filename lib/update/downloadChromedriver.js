const Spinner = require("@slimio/async-cli-spinner");
const got = require('got');
const { normalizedPlatform, normalizedArch, pipeline, createWriteStream, chmod } = require('../utils');
const { ParseOne } = require('unzipper');

module.exports = {
  downloadChromedriver: async (filepath, config) => {
    const spinner = new Spinner().start('Downloading chromedriver...');
    const { url } = config.chrome.files[normalizedPlatform][normalizedArch];
    await pipeline(
      got.stream(url),
      ParseOne(),
      createWriteStream(filepath)
    ).then(_ => chmod(filepath, '755'));
    spinner.succeed(`Chromdriver download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
  }
};

