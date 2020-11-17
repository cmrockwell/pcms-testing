const editorPanel = require('../components/EditorPanel')
const richToolbar = require('../components/Richtoolbar')
const editViewFrame = require('../components/EditViewFrame')
const pathBrowser = require('../components/PathBrowser')
const {I} = inject()

class EditPagePage {

  editorPanel
  richToolbar
  editViewFrame
  pathBrowser

  constructor() {
    this.editorPanel = editorPanel
    this.richToolbar = richToolbar
    this.editViewFrame = editViewFrame
    this.pathBrowser = pathBrowser
    this.locator = {
      loadSpinner() {
        return locate({css: '.spinner-wrapper'})
            .as('load spinner')
      }
    }
  }

  loaded() {
    I.seeInTitle('Page Editor')
    I.dontSeeElement(this.locator.loadSpinner())
  }
}

module.exports = new EditPagePage()
module.exports.EditPage = EditPagePage