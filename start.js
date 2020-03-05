const {existsSync} = require('fs');
const { spawn } = require('child_process');

module.exports = {
  start: ({ selenoidPath, configPath }) => {
    if (existsSync(selenoidPath)) {
    spawn(`${selenoidPath}`, ['-disable-docker', '-conf', configPath, 'start'], { stdio: 'inherit' });
    } else {
      throw new Error('Missing selenoid binary...maybe forget to call "selenoid update" ?');
    }
  }
};

