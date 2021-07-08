const Spinner = require("@slimio/async-cli-spinner");
const got = require('got');
const { normalizedPlatform, normalizedArch, isWindows, pipeline, createWriteStream, chmod } = require('../utils');
const gunzip = require('zlib').createGunzip();
const tarfs = require('tar-fs');
const unzipper = require('unzipper');


module.exports = {
  downloadGeckodriver: async ({ verbose }, outputDir, filepath, config) => {
    const spinner = new Spinner({ verbose }).start('Downloading geckodriver...');
    const { url } = config.firefox.files[normalizedPlatform][normalizedArch];
    isWindows
      ? await pipeline(got.stream(url), unzipper.ParseOne(), createWriteStream(filepath))
      : await pipeline(got.stream(url), gunzip, tarfs.extract(outputDir));
    await chmod(filepath, '755');
    spinner.succeed(`Geckodriver download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
  }
};
