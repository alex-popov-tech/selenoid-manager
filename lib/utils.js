const { promisify } = require('util');
const fs = require('fs');
const del = require('del');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const { platform, arch } = require('os');
const got = require('got');


module.exports = {
  pipeline: promisify(require('stream').pipeline),
  createWriteStream: fs.createWriteStream,
  chmod: promisify(fs.chmod),
  writeFile: promisify(fs.writeFile),
  rename: promisify(fs.rename),


  normalizedPlatform: { 'win32': 'windows' }[platform()] || platform(),
  normalizedArch: { 'x64': 'amd64', 'x32': '386' }[arch()] || arch(),
  isWindows: platform() === 'win32',

  ensureDirExists: async path => stat(path).catch(() => mkdir(path)),
  clearDirContent: async dirPath => {
    await Promise.all(
      await readdir(dirPath)
        .then(filepaths => filepaths
          .map(filepath => del(dirPath + '/' + filepath, { force: true })))
    );
  },

  latestBrowsersConfig: async () => got('https://raw.githubusercontent.com/aerokube/cm/master/browsers.json')
    .then(response => JSON.parse(response.body))
};

