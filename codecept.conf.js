const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './src/tests/*.js',
  output: './output',
  verbose: true,
  helpers: {
    Puppeteer: {
      url: 'http://localhost:8080',
      show: true,
      defaultViewport: null,
      windowSize: '1900x950',
      chrome: {
        args: ['--no-sandbox', '--window-size=1900,950'],
      }
    }
  },
  include: {
    I: './src/actor.codecept.js',
    askUserModal: './src/modals/AskUserModal.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'pcms-testing',
  plugins: {
    pauseOnFail: {
      enabled: false
    },
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: false
    },
    screenshotOnFail: {
      enabled: true
    }
  }
}