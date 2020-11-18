const loginPage = require('./pages/LoginPage')

module.exports = () => {
  return actor({
    async loginAs(user) {
      await loginPage.loginAs(user)
    },

    async amLoggedIn() {
    }
  })
}
