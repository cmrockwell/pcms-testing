const {I} = inject()

class EditViewFrame {

  constructor() {
    this.locator = {
      frame() {
        return {frame: '#editview'}
      },
      inlineEdit() {
        return locate('.teaser-text.inline-edit')
            .withAttr({'data-per-inline': 'model.text'})
            .as('inline-edit')
      }
    }
  }

  selectInlineEdit() {
    I.switchTo(this.locator.frame())
    I.click(this.locator.inlineEdit())
    I.click(this.locator.inlineEdit())
    I.switchTo()
  }

  containsText(text) {
    I.switchTo(this.locator.frame())
    I.see(text)
    I.switchTo()
  }
}

module.exports = new EditViewFrame()
module.exports.EditPage = EditViewFrame