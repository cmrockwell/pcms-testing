class EditViewFrame {

  constructor() {
    this.locator = locate('#editview').as('[#editview frame]')
  }
}

module.exports = new EditViewFrame()
module.exports.EditPage = EditViewFrame