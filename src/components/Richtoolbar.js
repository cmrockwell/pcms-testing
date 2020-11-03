const {I} = inject()

class RichToolbar {

  constructor() {
    this.dropDown = {
      animation: {
        in: 0.3, //s
        out: 0.225, //s
      }
    }
    this.locator = {
      iconsToggle() {
        return locate('.btn-group.group-icons')
            .as('insert icon')
      },
      iconItem(name) {
        return locate(this.iconsToggle())
            .find('.items-list')
            .find('.item')
            .withText(name)
            .as(name)
      },
      imageToggle(name) {
        return locate('.btn-group.group-image')
            .as('insert image')
      }
    }
  }

  insertIcon(name) {
    I.click(this.locator.iconsToggle())
    I.wait(this.dropDown.animation.in)
    I.see(name)
    I.click(this.locator.iconItem(name))
    I.wait(this.dropDown.animation.out)
  }
}

module.exports = new RichToolbar()
module.exports.RichToolbar = RichToolbar