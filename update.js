const { promisify } = require('util');
const path = require('path');
const fs = require('fs');
const { createWriteStream } = fs;
const chmod = promisify(fs.chmod);
const del = require('del');
const rename = promisify(fs.rename);
const readdir = promisify(fs.readdir);
const { platform, arch } = require('os');
const got = require('got');
const { extract } = require('tar-fs');
const pipeline = promisify(require('stream').pipeline);
const { generateConfig } = require('./browsers');
const Spinner = require("@slimio/async-cli-spinner");

module.exports = {
  update: async ({ downloadOutputPath, selenoidPath, selenoidConfigPath, chromedriverPath, geckodriverPath, operadriverPath }) => {
    await clean(downloadOutputPath);
    const driversInfo = await latestBrowsersConfig();
    await Promise.all([
      generateConfig({ filepath: selenoidConfigPath, chromedriverPath, geckodriverPath, operadriverPath }),
      downloadSelenoid(selenoidPath),
      downloadChromedriver(chromedriverPath, driversInfo),
      downloadOperadriver(downloadOutputPath, operadriverPath, driversInfo),
      downloadGeckodriver(downloadOutputPath, geckodriverPath, driversInfo)
    ]);
  }
};

const normalizedPlatform = { win32: 'windows' }[platform()] || platform();
const normalizedArch = { x64: 'amd64', x32: '386' }[arch()];

const clean = async dirPath => {
  await Promise.all(
    await readdir(dirPath)
      .then(filepaths => filepaths
        .map(filepath => del(dirPath + '/' +filepath, {force: true})))
  );
}

const latestBrowsersConfig = async () => got('https://raw.githubusercontent.com/aerokube/cm/master/browsers.json')
  .then(response => JSON.parse(response.body));


const downloadChromedriver = async (filepath, config) => {
  const spinner = new Spinner().start('Downloading chromedriver...');
  const { url } = config.chrome.files[normalizedPlatform][normalizedArch];
  const { ParseOne } = require('unzipper');
  await pipeline(
    got.stream(url),
    ParseOne(),
    createWriteStream(filepath)
  ).then(_ => chmod(filepath, '755'));
  spinner.succeed(`Chromdriver download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
};

const downloadGeckodriver = async (outputPath, filepath, config) => {
  const spinner = new Spinner().start('Downloading geckodriver...');
  const { url } = config.firefox.files[normalizedPlatform][normalizedArch];
  const unzip = require('zlib').createGunzip();
  await pipeline(
    got.stream(url),
    unzip,
    extract(outputPath)
  ).then(_ => chmod(filepath, '755'));
  spinner.succeed(`Geckodriver download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
};

const downloadOperadriver = async (outputDir, filepath, config) => {
  const spinner = new Spinner().start('Downloading operadriver...');
  const { url, filename } = config.opera.files[normalizedPlatform][normalizedArch];
  const unzip = require('unzip-stream');

  await pipeline(
    got.stream(url),
    unzip.Extract({ path: outputDir }) // binaries/operadriver_osarch/operadriver
  ).then(() => rename(path.resolve(outputDir, filename), filepath)) // binaries/operadriver_osarch/operadriver -> binaries/operadriver
    .then(() => del(path.resolve(outputDir, filename.split('/')[0]), {force: true})) // remove binaries/operadriver_osarch folder
    .then(() => chmod(filepath, '755'));
  spinner.succeed(`Operadriver download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
};

const downloadSelenoid = async filepath => {
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
};

