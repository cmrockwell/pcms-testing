const loginPage = require('./pages/LoginPage')
const pagesPage = require('./pages/PagesPage')

module.exports = () => {
  return actor({
    async loginAs(user) {
      await loginPage.loginAs(user)
      pagesPage.navigate()
    },

    async amLoggedIn() {
      pagesPage.navigate()
    }
  })
}
