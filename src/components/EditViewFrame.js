const {Website} = require('../const')
const {I} = inject()

class EditViewFrame {

  constructor() {
    this.modal = {
      animation: {
        in: 0.3, //s
        out: 0.2, //s
      }
    }
    this.locator = {
      frame() {
        return {frame: '#editview'}
      },
      inlineEdit() {
        return locate('.inline-edit')
            .withAttr({'data-per-inline': 'model.text'})
            .as('inline-edit')
      },
      img(src) {
        return locate('img')
            .withAttr({src})
            .as(src)
      }
    }
  }

  selectFirstInlineEdit() {
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

  openEditImageModal(src) {
    I.switchTo(this.locator.frame())
    I.seeElement(this.locator.img(src))
    I.waitForClickable(this.locator.img(src))
    I.doubleClick(this.locator.img(src))
    I.wait(this.modal.animation.in)
    I.switchTo()
  }

  seeAttributesOnImage(src, attrs) {
    I.switchTo(this.locator.frame())
    I.seeAttributesOnElements(this.locator.img(src), attrs)
  }
}

module.exports = new EditViewFrame()
module.exports.EditPage = EditViewFrame