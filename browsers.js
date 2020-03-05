const { promisify } = require('util');
const writeFile = promisify(require('fs').writeFile);

module.exports = {
  generateConfig: async ({ filepath, chromedriver, geckodriver, operadriver }) => {
    await writeFile(filepath, JSON.stringify(
      {
        chrome: {
          default: 'latest',
          versions: {
            latest: {
              image: [
                chromedriver,
                '--whitelisted-ips=',
                '--verbose'
              ],
              port: '',
              path: '/'
            }
          }
        },
        firefox: {
          default: 'latest',
          versions: {
            latest: {
              image: [
                geckodriver,
                '--host',
                '127.0.0.1',
                '--log',
                'debug'
              ],
              port: '',
              path: '/'
            }
          }
        },
        opera: {
          default: 'latest',
          versions: {
            latest: {
              image: [
                operadriver,
                '--whitelisted-ips=\'\'',
                '--verbose'
              ],
              port: '',
              path: '/'
            }
          }
        }
      },
      null,
      2
    ))
  }
};
