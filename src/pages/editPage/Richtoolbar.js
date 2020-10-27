const {I} = inject();

class RichToolbar {

  constructor() {
    this.dropDown = {
      animation: {
        in: 0.3, //s
        out: 0.225, //s
      }
    }
    this.icons = {
      locator: {css: '.btn-group.group-icons'},
      icon: {
        baseXpath: `//div[@class='btn-group group-icons'] //ul[@class='items-list'] /li[@class='item'][contains(text(), '%NAME%')]`
      }
    }
  }

  insertIcon(name) {
    const iconLocator = this.icons.icon.baseXpath.replace('%NAME%', name)

    I.click(this.icons.locator)
    I.wait(this.dropDown.animation.in)
    I.see('launcher-icon-4x')
    I.click(iconLocator)
    I.wait(this.dropDown.animation.out)
  }
}

module.exports = new RichToolbar();
module.exports.RichToolbar = RichToolbar;