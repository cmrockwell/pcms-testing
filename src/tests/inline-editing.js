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

After(({I}) => {
  I.deleteWebsite(websiteTitle)
})

Scenario('insert an icon through both toolbars', ({I}) => {
  const iconsDropdown = {
    animation: {
      in: 0.3, //s
      out: 0.225, //s
    }
  }

  I.click({css: '.btn-group.group-icons'})
  I.wait(iconsDropdown.animation.in)
  I.see('launcher-icon-4x')
  I.click({
    xpath: `//div[@class='btn-group group-icons']
                //ul[@class='items-list']
                  /li[@class='item'][contains(text(), 'launcher-icon-4x')]`
  })

  within({frame: '#editview'}, () => {
    I.see('[icon:launcher-icon-4x]')
  })

  I.click({css: '.editor-panel .text-editor.inline-edit'})
  I.click({css: '.editor-panel .text-editor.inline-edit'})
  I.click({css: '.editor-panel .btn-group.group-icons'})
  I.wait(iconsDropdown.animation.in)
  I.click({
    xpath: `//div[@class='editor-panel']
              //div[@class='btn-group group-icons']
                //ul[@class='items-list']
                  /li[@class='item'][contains(text(), 'launcher-icon-2x')]`
  })
  I.see('[icon:launcher-icon-2x]')
})