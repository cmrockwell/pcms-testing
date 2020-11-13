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
      //keepCookies: true,
      url: process.env.CODECEPT_URL || 'http://localhost:8080',
      show: true,
      defaultViewport: null,
      windowSize: '1900x950',
      chrome: {
        args: ['--no-sandbox', '--window-size=1900,950'],
      }
    },
    REST: {
      endpoint: 'http://localhost:8080/perapi',
      onRequest(request) {
      }
    }
  },
  include: {
    I: './src/actor.codecept',
    perApi: './src/PerApi',
    loginPage: './src/pages/LoginPage',
    editPagePage: './src/pages/EditPagePage',
    createPagePage: './src/pages/CreatePagePage',
    pagesPage: './src/pages/PagesPage',
  },
  bootstrap() {
    const dir = path.join(__dirname, exports.config.output)

    fs.readdir(dir, (err, files) => {
      if (err) throw err
      files.forEach((file) => {
        fs.unlink(path.join(dir, file), err => {
          if (err) throw err
        })
      })
    })
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
          login: async (I) => {
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