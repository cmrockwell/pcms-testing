const {I} = inject()

class PathBrowser {

  constructor() {
    this.animation = {
      in: 0.3, //s
      out: 0.2, //s
    }
    this.locator = {
      container() {
        return locate('.pathbrowser')
      },
      browserEntry(name) {
        return locate('.pathbrowser')
            .find('.browse-list')
            .find('span').withText(name)
            .as(name)
      },
      selectedPath() {
        return locate('.pathbrowser')
            .find('pathbrowser-selected-path')
            .as('selected path')
      }
    }
  }

  select() {
    I.click('select', this.locator.container())
    I.wait(this.animation.out)
  }

  selectBrowseEntry(name) {
    I.click(this.locator.browserEntry(name))
  }

  selectedPathIs(path) {
    I.see(path, this.locator.selectedPath())
  }

  switchToLinkTab() {

  }
}

module.exports = new PathBrowser()
module.exports.PathBrowser = PathBrowser