const fs = require('fs')
const path = require('path')
const {setHeadlessWhen} = require('@codeceptjs/configure')

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './src/tests/*.js',
  output: `./output`,
  verbose: true,
  helpers: {
    Puppeteer: {
      keepCookies: true,
      url: process.env.CODECEPT_URL || 'http://localhost:8080',
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
    loginPage: './src/pages/LoginPage.js',
    editPagePage: './src/pages/EditPagePage.js',
    createPagePage: './src/pages/CreatePagePage.js',
    pagesPage: './src/pages/PagesPage.js',
  },
  bootstrap: () => {
    const outputDir = path.join(__dirname, exports.config.output, '/*')
    fs.rmdirSync(outputDir, { recursive: true })
  },
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
    },
    autoLogin: {
      enabled: true,
      saveToFile: true,
      inject: 'loginAs',
      users: {
        admin: {
          login: (I) => {
            I.loginAs('admin')
          },
          check: (I) => {
            I.amLoggedIn()
          }
        }
      }
    }
  }
}