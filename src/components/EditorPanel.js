const {I} = inject()

class EditorPanel {

  constructor() {
    this.locator = {
      title() {
        return locate('.editor-panel')
            .find('.panel-title')
            .as('title')
      }
    }
  }

  titleIs(title) {
    return I.see(title, this.locator.title())
  }
}

module.exports = new EditorPanel()
module.exports.EditorPanel = EditorPanel