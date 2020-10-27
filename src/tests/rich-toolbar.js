const websiteTitle = 'codeceptjs'
const pageTitle = `${websiteTitle}-inline-editing`
const editViewFrame = {frame: '#editview'}
const inlineEditElement = {css: '.teaser-text.inline-edit[data-per-inline="model.text"]'}

Feature('rich-toolbar')

Before(({I}) => {
  I.login('admin', 'admin')
  I.see('your websites', 'h2')
  I.createNewWebsite(websiteTitle)
  I.click('Pages')
  I.createNewPage(websiteTitle, pageTitle, true)
  I.seeInTitle('Page Editor')
  I.dontSeeElement({css: '.spinner-wrapper'})

  within(editViewFrame, () => {
    I.click(inlineEditElement)
    I.click(inlineEditElement)
  })

  I.see('Teaser Vertical', {css: '.editor-panel'})
})

After(({I}) => {
  I.deleteWebsite(websiteTitle)
})

/*
Scenario('insert icon', ({I}) => {
  const iconsDropdown = {
    animation: {
      in: 0.3, //s
      out: 0.225, //s
    }
  }
  const insertIconButton = {css: '.btn-group.group-icons'}
  const launcherIcon1xListItem = {xpath: `//div[@class='btn-group group-icons'] //ul[@class='items-list'] /li[@class='item'][contains(text(), 'launcher-icon-1x')]`}

  I.click(insertIconButton)
  I.wait(iconsDropdown.animation.in)
  I.see('launcher-icon-4x')
  I.click(launcherIcon1xListItem)

  within(editViewFrame, () => {
    I.see('[icon:launcher-icon-1x]')
  })
})
 */

Scenario('insert image', ({I}) => {
  const insertImageButton = {css: '.btn-group.group-image'}
  const modal = {
    locator: {css: '.modal-container'},
    animation: {
      in: 0.3, //s
      out: 0.2, //s
    }
  }
  const launcherIcon1xBrowserEntry = {xpath: '//ul[@class="browse-list"]/li/span[contains(text(), "launcher-icon-1x.png")]'}
  const launcherIcon1xPath = `/content/${websiteTitle}/assets/icons/launcher-icon-1x.png`
  const launcherIcon1xImg = {css: `img[src="/content/${websiteTitle}/assets/icons/launcher-icon-1x.png"]`}
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

  within(editViewFrame, () => {
    I.seeElement(launcherIcon1xImg)
    I.waitForClickable(launcherIcon1xImg)
    I.doubleClick(launcherIcon1xImg)
    I.wait(modal.animation.in)
  })

  /**
   * Doesn't work
   * issue: https://github.com/headwirecom/peregrine-cms/issues/637
   */
  /*
  I.see('Edit Image', modal.locator)

  within(modal.locator, () => {
    I.click(linkTabToggle)
    I.fillField('Image Width (px)', 500)
    I.fillField('Image Height (px)', 300)
    I.click('select', {css: '.modal-footer'})
    I.wait(modal.animation.out)
  })

  within(editViewFrame, () => {
    I.seeElement(launcherIcon1xImg)
    I.usePuppeteerTo('check dimensions', async ({page}) => {
      const img = await page.$(launcherIcon1xImg.css)
    })
  })
  */
})
