const {I} = inject()

class RichToolbar {

  constructor() {
    this.dropDown = {
      animation: {
        in: 0.3, //s
        out: 0.225, //s
      }
    }
    this.modal = {
      animation: {
        in: 0.3, //s
        out: 0.2, //s
      }
    }
    this.locator = {
      toggle(group) {
        return locate(`.btn-group.group-${group}`)
            .as(`toggle ${group}`)
      },
      iconItem(name) {
        return locate(this.toggle('icons'))
            .find('.items-list')
            .find('.item').withText(name)
            .as(name)
      }
    }
  }

  insertIcon(name) {
    I.click(this.locator.toggle('icons'))
    I.wait(this.dropDown.animation.in)
    I.see(name)
    I.click(this.locator.iconItem(name))
    I.wait(this.dropDown.animation.out)
  }

  openImageBrowser() {
    I.click(this.locator.toggle('image'))
    I.wait(this.modal.animation.in)
  }
}

module.exports = new RichToolbar()
module.exports.RichToolbar = RichToolbar