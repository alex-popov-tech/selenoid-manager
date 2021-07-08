const Spinner = require("@slimio/async-cli-spinner");
const got = require('got');
const { normalizedPlatform, normalizedArch, pipeline, chmod, createWriteStream } = require('../utils');
const { ParseOne } = require('unzipper');


module.exports = {
  downloadOperadriver: async ({ verbose }, filepath, config) => {
    const spinner = new Spinner({ verbose }).start('Downloading operadriver...');
    const { url, filename } = config.opera.files[normalizedPlatform][normalizedArch];
    await pipeline(
        got.stream(url),
        ParseOne(filename),
        createWriteStream(filepath)
      ).then(() => chmod(filepath, '755'));
    spinner.succeed(`Operadriver download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
  }
};
