const {Tenant} = require('../const')
const askUserModal = require('../components/AskUserModal')
const editPagePage = require('./EditPagePage')
const {I} = inject()

class PagesPage {

  constructor() {
    this.askUserModal = askUserModal
    this.url = `/content/admin/pages/pages.html/path:/content/${Tenant}/pages`
    this.locator = {
      editButton(title) {
        return locate('a')
            .withAttr({title: `edit '${title}'`})
            .as(`edit page ("${title}")`)
      },
      deleteButton(title) {
        return locate('a')
            .withAttr({title: `edit '${title}'`})
            .as(`delete page ("${title}")`)
      }
    }
  }

  navigate() {
    I.amOnPage(this.url)
    I.waitForElement('.explorer', 10)
  }

  deletePage(title) {
    I.click(this.locator.deleteButton(title))
    this.askUserModal.confirm()
    I.dontSeeElement(this.locator.deleteButton(title))
  }

  editPage(title) {
    this.navigate()
    I.click(this.locator.editButton(title))
    editPagePage.loaded()
  }
}

module.exports = new PagesPage()
module.exports.PagesPage = PagesPage