const {Tenant} = require('../const')

Feature('rich-toolbar')

Before(async ({loginAs, perApi, pagesPage, editPagePage}) => {
  await perApi.createTenant()
  await perApi.createPage('rich-toolbar')
  await perApi.addComponentToPage(
      'rich-toolbar',
      `/apps/pcms_testing/components/richtext`,
      'into-into',
      'sample'
  )
  await loginAs('admin')
  pagesPage.editPage('rich-toolbar')
  editPagePage.loaded()
  editPagePage.editViewFrame.selectFirstInlineEdit()
  editPagePage.componentExplorer.titleIs('Rich Text')
})

After(({pagesPage, perApi}) => {
  perApi.deletePage('rich-toolbar')
  pagesPage.navigate()
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
