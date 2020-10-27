const richToolbar = require('./editPage/Richtoolbar')
const { I } = inject();

class EditPage {
  constructor() {
    this.richToolbar = richToolbar
  }
}

module.exports = new EditPage();
module.exports.AttachFile = EditPage;