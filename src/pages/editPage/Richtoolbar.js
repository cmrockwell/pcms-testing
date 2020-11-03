const {I} = inject();

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
            .as('[icons drop-down toggle]')
      },
      iconItem(name) {
        return locate(this.iconsToggle())
            .find('.items-list')
            .find('.item')
            .withText(name)
            .as(`[drop-down item "${name}"]`)
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

module.exports = new RichToolbar();
module.exports.RichToolbar = RichToolbar;