const websiteTitle = 'codeceptjs'
const pageTitle = `${websiteTitle}-inline-editing`

Feature('inline-editing')

Before(({I}) => {
  const inlineEdit = {
    locator: {css: 'div.teaser-text.inline-edit[data-per-inline="model.text"]'}
  }

  I.login('admin', 'admin')
  I.see('your websites', 'h2')
  I.createNewWebsite(websiteTitle)
  I.click('Pages')
  I.createNewPage(websiteTitle, pageTitle, true)
  I.seeInTitle('Page Editor')
  I.wait(1)

  within({frame: '#editview'}, () => {
    I.waitForClickable(inlineEdit.locator)
    I.click(inlineEdit.locator)
    I.click(inlineEdit.locator)
  })

  I.see('Teaser Vertical', {css: 'div.editor-panel'})
})

Scenario('insert an icon (launcher-icon-4x)', ({I}) => {
  const iconsDropdown = {
    locator: {css: 'div.btn-group.group-icons'},
    animation: {
      in: 0.3, //s
      out: 0.225 //s
    }
  }

  I.click(iconsDropdown.locator)
  I.wait(iconsDropdown.animation.in)
  I.see('launcher-icon-4x')
  within(iconsDropdown.locator, () => {
    I.click(
        locate('.items-list')
            .find('.item')
            .withText('launcher-icon-4x')
    )
  })
})

After(({I}) => {
  I.deleteWebsite(websiteTitle)
})