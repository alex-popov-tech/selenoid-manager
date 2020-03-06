const { writeFile } = require('../utils');


module.exports = {
  generateConfig: async ({ filepath, chromedriverPath, geckodriverPath, operadriverPath }) => {
    await writeFile(filepath, JSON.stringify(
      {
        chrome: {
          default: 'latest',
          versions: { latest: { image: [chromedriverPath, '--whitelisted-ips=', '--verbose'], port: '', path: '/' } }
        },
        firefox: {
          default: 'latest',
          versions: { latest: { image: [geckodriverPath, '--host', '127.0.0.1', '--log', 'debug'], port: '', path: '/' } }
        },
        opera: {
          default: 'latest',
          versions: { latest: { image: [operadriverPath, '--whitelisted-ips=\'\'', '--verbose'], port: '', path: '/' } }
        }
      },
      null,
      2
    ))
  }
};
