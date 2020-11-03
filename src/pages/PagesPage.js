const {I} = inject()

class PagesPage {

  constructor() {
    this.url = `/content/admin/pages/pages/create.html/path:/content/pcms_testing/pages`
  }

  navigate() {
    I.amOnPage(this.url)
  }
}

module.exports = new PagesPage()
module.exports.PagesPage = PagesPage