const Spinner = require("@slimio/async-cli-spinner");
const got = require('got');
const { normalizedPlatform, normalizedArch, pipeline, createWriteStream, chmod } = require('../utils');


module.exports = {
  downloadSelenoid: async filepath => {
    const spinner = new Spinner().start('Downloading selenoid...');
    const latestReleaseInfo = await got('https://api.github.com/repos/aerokube/selenoid/releases/latest').then(response => JSON.parse(response.body));
    const url = latestReleaseInfo.assets
      .find(asset => asset.name.includes(`selenoid_${normalizedPlatform}_${normalizedArch}`))
      .browser_download_url;
    await pipeline(
      got.stream(url),
      createWriteStream(filepath)
    ).then(_ => chmod(filepath, '755'));
    spinner.succeed(`Selenoid download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
  }
};

