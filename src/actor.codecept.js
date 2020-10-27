// in this file you can append custom step methods to 'I' object

module.exports = () => {
  return actor({
    login(username, password) {
      this.amOnPage('http://localhost:8080/system/sling/form/login')
      this.fillField('Username', username)
      this.fillField('Password', password)
      this.click('Log In')
    },

    createNewWebsite(title, andEdit=false) {
      this.amOnPage('http://localhost:8080/content/admin/pages/index.html')
      this.click({css: '.create-tenant.action'})
      this.see('ThemecleanFlex Site', 'a')
      this.click('Next')
      this.click('default.css')
      this.click('Next')
      this.fillField('Site Title', title)
      this.click('Next')

      if (andEdit) {
        this.click('Create and Edit!')
      } else {
        this.click('Create')
      }

      this.dontSee('create a website')
    },

    deleteWebsite(title) {
      const askUserModal = {
        animation: {
          in: 0.3, //s
          out: 0.2, //s
        }
      }

      this.amOnPage('http://localhost:8080/content/admin/pages/index.html')
      this.wait(0.5)
      this.click({css: `a[title="delete '${title}'"]`})
      this.see('Delete Site')
      this.wait(askUserModal.animation.in)
      this.click('Yes', {css: '#askUserModal'})
      this.wait(askUserModal.animation.out)
      this.dontSee(title)
    },

    createNewPage(website, title, andEdit=false) {
      this.amOnPage(
          `http://localhost:8080/content/admin/pages/pages/create.html/path:/content/${website}/pages`)
      this.click('Next')
      this.fillField('Title', title)
      this.click('Next')

      if (andEdit) {
        this.click('Finish and Edit!')
      } else {
        this.click('Finish')
      }

      this.dontSee('create a page')
      /**
       * TODO: workaround for broken reactivity in right-panel editor
       * https://github.com/headwirecom/peregrine-cms/issues/637
       */
      this.wait(3)
    }

    // Define custom steps here, use 'this' to access default methods of this.
    // It is recommended to place a general 'login' function here.
  });
}
