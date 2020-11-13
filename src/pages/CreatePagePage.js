const {Tenant} = require('../const')
const {I} = inject()

class CreatePagePage {

  constructor() {
    this.url = `/content/admin/pages/pages/create.html/path:/content/${Tenant}/pages`
  }

  createPage(title, andEdit = false) {
    I.amOnPage(this.url)
    I.click('Next')
    I.fillField('Title', title)
    I.click('Next')

    if (andEdit) {
      I.click('Finish and Edit!')
    } else {
      I.click('Finish')
    }

    I.dontSee('create a page')
    /**
     * TODO: workaround for broken reactivity in right-panel editor
     * https://github.com/headwirecom/peregrine-cms/issues/637
     */
    if (andEdit) {
      I.wait(4)
    }
  }
}

module.exports = new CreatePagePage()
module.exports.CreateNewPagePage = CreatePagePage