const {Website} = require('../const')

Feature('rich-toolbar')

Before(({loginAs, createPagePage, editPagePage}) => {
  loginAs('admin')
  createPagePage.createPage('rich-toolbar', true)
  editPagePage.loaded()
  editPagePage.editViewFrame.selectInlineEdit()
  editPagePage.componentExplorer.titleIs('Teaser Vertical')
})

After(({pagesPage}) => {
  pagesPage.navigate()
  pagesPage.deletePage('rich-toolbar')
})

Scenario('insert icon', ({editPagePage}) => {
  const iconName = 'launcher-icon-1x'

  editPagePage.richToolbar.insertIcon(iconName)
  editPagePage.editViewFrame.containsText(`[icon:${iconName}]`)
})

Scenario('insert image', ({I, editPagePage}) => {
  const insertImageButton = {css: '.btn-group.group-image'}
  const modal = {
    locator: {css: '.modal-container'},
    animation: {
      in: 0.3, //s
      out: 0.2, //s
    }
  }
  const launcherIcon1xBrowserEntry = {xpath: '//ul[@class="browse-list"]/li/span[contains(text(), "launcher-icon-1x.png")]'}
  const launcherIcon1xPath = `/content/${Website.title}/assets/icons/launcher-icon-1x.png`
  const launcherIcon1xImg = {css: `img[src="/content/${Website.title}/assets/icons/launcher-icon-1x.png"]`}
  const linkTabToggle = {xpath: '//*[@class="pathbrowser-tabs"]/*[@class="tab"]//*[@class="material-icons"][contains(text(), "link")]'}


  I.click(insertImageButton)
  I.wait(modal.animation.in)

  within(modal.locator, () => {
    I.click('icons', 'span')
    I.click(launcherIcon1xBrowserEntry)
    I.see(launcherIcon1xPath, {css: '.pathbrowser-selected-path'})
    I.click('select')
    I.wait(modal.animation.out)
  })

  within(editViewLocator, () => {
    I.seeElement(launcherIcon1xImg)
    I.waitForClickable(launcherIcon1xImg)
    I.doubleClick(launcherIcon1xImg)
    I.wait(modal.animation.in)
  })

  I.see('Edit Image', modal.locator)

  within(modal.locator, () => {
    I.click(linkTabToggle)
    I.fillField('Image Width (px)', 500)
    I.fillField('Image Height (px)', 300)
    I.click('select', {css: '.modal-footer'})
    I.wait(modal.animation.out)
  })

  within(editViewLocator, async () => {
    I.seeAttributesOnElements(launcherIcon1xImg, {width: 500, height: 300})
  })
})
