const askUserModal = require('../components/AskUserModal')
const editPagePage = require('./EditPagePage')
const {I} = inject()

class PagesPage {

  constructor() {
    this.askUserModal = askUserModal
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

  getUrl(tenant) {
    return `/content/admin/pages/pages.html/path:/content/${tenant}/pages`
  }

  navigate(tenant) {
    I.amOnPage(this.getUrl(tenant))
    I.waitForElement('.explorer', 10)
  }

  deletePage(title) {
    I.click(this.locator.deleteButton(title))
    this.askUserModal.confirm()
    I.dontSeeElement(this.locator.deleteButton(title))
  }

  editPage(title) {
    I.click(this.locator.editButton(title))
    editPagePage.loaded()
  }
}

module.exports = new PagesPage()
module.exports.PagesPage = PagesPage