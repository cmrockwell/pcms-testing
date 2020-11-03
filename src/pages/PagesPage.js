const {Website} = require('../const')
const askUserModal = require('../components/AskUserModal')
const {I} = inject()

class PagesPage {

  constructor() {
    this.askUserModal = askUserModal
    this.url = `/content/admin/pages/pages.html/path:/content/${Website.title}/pages`
    this.locator = {
      deleteButton(title) {
        return locate('a')
            .withAttr({title: `delete '${title}'`})
            .as(`delete page ("${title}")`)
      }
    }
  }

  navigate() {
    I.amOnPage(this.url)
    I.waitForNavigation(this.url)
  }

  deletePage(title) {
    I.click(this.locator.deleteButton(title))
    this.askUserModal.confirm()
  }
}

module.exports = new PagesPage()
module.exports.PagesPage = PagesPage