const websiteTitle = 'codeceptjs'
const pageTitle = `${websiteTitle}-inline-editing`

Feature('inline-editing')

Before(({I}) => {
  I.login('admin', 'admin')
  I.see('your websites', 'h2')
  I.createNewWebsite(websiteTitle)
  I.click('Pages')
  I.createNewPage(websiteTitle, pageTitle, true)
  I.seeInTitle('Page Editor')
  I.wait(1)

  within({frame: '#editview'}, () => {
    I.waitForClickable(
        {css: '.teaser-text.inline-edit[data-per-inline="model.text"]'})
    I.click({css: '.teaser-text.inline-edit[data-per-inline="model.text"]'})
    I.click({css: '.teaser-text.inline-edit[data-per-inline="model.text"]'})
  })

  I.see('Teaser Vertical', {css: 'div.editor-panel'})
})

Scenario('insert an icon (launcher-icon-4x)', ({I}) => {
  const iconsDropdown = {
    animation: {
      in: 0.3, //s
      out: 0.225, //s
    }
  }

  I.click({css: '.btn-group.group-icons'})
  I.wait(iconsDropdown.animation.in)
  I.see('launcher-icon-4x')

  within({css: '.editor-panel .btn-group.group-icons'}, () => {
    I.click(locate('.items-list').find('.item').withText('launcher-icon-4x'))
  })
})

After(({I}) => {
  I.deleteWebsite(websiteTitle)
})