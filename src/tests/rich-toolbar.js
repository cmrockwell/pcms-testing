const {Component} = require('../const')

const FEATURE_NAME = 'rich-toolbar'
const TENANT = 'pcms_testing'
const PAGE = FEATURE_NAME

Feature(FEATURE_NAME)

Before(async ({loginAs, perApi, pagesPage, editPagePage}) => {
  await perApi.createTenant(TENANT)
  await perApi.createPage(TENANT, PAGE)
  await perApi.addComponent(
      TENANT,
      PAGE,
      Component.richText(TENANT),
      'into-into',
      'sample'
  )
  await loginAs('admin')
  pagesPage.navigate(TENANT)
  pagesPage.editPage(PAGE)
  editPagePage.editViewFrame.selectFirstInlineEdit()
  editPagePage.editorPanel.titleIs('Rich Text')
})

After(({perApi}) => {
  perApi.deleteTenant(TENANT)
})

Scenario('insert icon', ({editPagePage}) => {
  const iconName = 'launcher-icon-1x'

  editPagePage.richToolbar.insertIcon(iconName)
  editPagePage.editViewFrame.containsText(`[icon:${iconName}]`)
})

Scenario('insert image', async ({editPagePage}) => {
  const imgName = 'launcher-icon-1x.png'

  editPagePage.richToolbar.openImageBrowser()
  await editPagePage.pathBrowser.selectBrowseEntry('icons')
  await editPagePage.pathBrowser.selectBrowseEntry(imgName)
  editPagePage.pathBrowser.select()
  editPagePage.editViewFrame.openEditImageModal(
      `/content/${TENANT}/assets/icons/${imgName}`)
  editPagePage.pathBrowser.headerIs('Edit Image')
  editPagePage.pathBrowser.setImageDimensions(500, 300)
  editPagePage.pathBrowser.select()
  editPagePage.editViewFrame.seeAttributesOnImage(
      `/content/${TENANT}/assets/icons/${imgName}`,
      {width: 500, height: 300}
  )
})

Scenario('open preview', async ({editPagePage}) => {
  await editPagePage.richToolbar.togglePreview()
  editPagePage.editViewFrame.isPreview()
  await editPagePage.richToolbar.togglePreview()
  editPagePage.editViewFrame.isEditMode()
})

Scenario('open preview in new tab', async ({I, editPagePage}) => {
  await editPagePage.richToolbar.openPreviewInNewTab(TENANT, PAGE)
})