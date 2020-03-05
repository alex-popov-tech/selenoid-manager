const { promisify } = require('util');
const fs = require('fs');
const { createWriteStream } = fs;
const chmod = promisify(fs.chmod);
const unlink = promisify(fs.unlink);
const rmdir = promisify(fs.rmdir);
const rename = promisify(fs.rename);
const { platform, arch } = require('os');
const got = require('got');
const { extract } = require('tar-fs');
const pipeline = promisify(require('stream').pipeline);
const { generateConfig } = require('./browsers');
const Spinner = require("@slimio/async-cli-spinner");

module.exports = {
  update: async ({ selenoid, selenoidConfig, chromedriver, geckodriver, operadriver }) => {
    await clean([selenoid, selenoidConfig, chromedriver, geckodriver, operadriver]);
    const driversInfo = await latestBrowsersConfig();
    await Promise.all([
      generateConfig({ filepath: selenoidConfig, chromedriver, geckodriver, operadriver }),
      downloadSelenoid(selenoid),
      downloadChromedriver(driversInfo),
      downloadOperadriver(driversInfo),
      downloadFirefoxdriver(driversInfo)
    ]);
  }
};

const normalizedPlatform = { win32: 'windows' }[platform()] || platform();
const normalizedArch = { x64: 'amd64', x32: '386' }[arch()];

const clean = async (pathsToDelete) => {
  await Promise.all(pathsToDelete.map(path => unlink(path).catch(err => null)));
}

const latestBrowsersConfig = async () => got('https://raw.githubusercontent.com/aerokube/cm/master/browsers.json')
  .then(response => JSON.parse(response.body));

const downloadChromedriver = async config => {
  const spinner = new Spinner().start('Downloading chromedriver...');
  const { url, filename } = config.chrome.files[normalizedPlatform][normalizedArch];
  const { ParseOne } = require('unzipper');
  await pipeline(
    got.stream(url),
    ParseOne(),
    createWriteStream(filename)
  ).then(_ => chmod(filename, '755'));
  spinner.succeed(`Chromdriver download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
};

const downloadFirefoxdriver = async config => {
  const spinner = new Spinner().start('Downloading geckodriver...');
  const { url, filename } = config.firefox.files[normalizedPlatform][normalizedArch];
  const unzip = require('zlib').createGunzip();
  await pipeline(
    got.stream(url),
    unzip,
    extract(filename)
  ).then(() => rename(`${filename}/${filename}`, 'tmp')) // gecko/gecko -> tmp
    .then(() => rmdir(filename)) // delete empty dir
    .then(() => rename('tmp', filename)) // tmp -> geckodriver
    .then(_ => chmod(filename, '755'));
  spinner.succeed(`Geckodriver download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
};

const downloadOperadriver = async config => {
  const spinner = new Spinner().start('Downloading operadriver...');
  const { url, filename } = config.opera.files[normalizedPlatform][normalizedArch];
  const unzip = require('unzip-stream');

  await pipeline(
    got.stream(url),
    unzip.Extract({ path: './' })
  ).then(_ => chmod(filename, '755'));
  spinner.succeed(`Operadriver download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
};

const downloadSelenoid = async filename => {
  const spinner = new Spinner().start('Downloading selenoid...');
  const latestReleaseInfo = await got('https://api.github.com/repos/aerokube/selenoid/releases/latest').then(response => JSON.parse(response.body));
  const url = latestReleaseInfo.assets
    .find(asset => asset.name.includes(`selenoid_${normalizedPlatform}_${normalizedArch}`))
    .browser_download_url;
  await pipeline(
    got.stream(url),
    createWriteStream(filename)
  ).then(_ => chmod(filename, '755'));
  spinner.succeed(`Selenoid download done in ${(spinner.elapsedTime / 1000).toFixed(1)}s !`);
};

