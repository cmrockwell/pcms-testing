const loginPage = require('./pages/LoginPage')
const pagesPage = require('./pages/PagesPage')

module.exports = () => {
  return actor({
    loginAs(user) {
      loginPage.loginAs(user)
      pagesPage.navigate()
    },

    amLoggedIn() {
      pagesPage.navigate()
    }
  })
}
