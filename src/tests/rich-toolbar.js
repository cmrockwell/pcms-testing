const {Tenant} = require('../const')

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

Scenario('insert image', async ({editPagePage}) => {
  editPagePage.richToolbar.openImageBrowser()
  await editPagePage.pathBrowser.selectBrowseEntry('icons')
  await editPagePage.pathBrowser.selectBrowseEntry('launcher-icon-1x.png')
  editPagePage.pathBrowser.select()
  editPagePage.editViewFrame.openEditImageModal(
      `/content/${Tenant}/assets/icons/launcher-icon-1x.png`)
  editPagePage.pathBrowser.headerIs('Edit Image')
  editPagePage.pathBrowser.setImageDimensions(500, 300)
  editPagePage.pathBrowser.select()
  editPagePage.editViewFrame.seeAttributesOnImage(
      `/content/${Tenant}/assets/icons/launcher-icon-1x.png`,
      {width: 500, height: 300})
})
