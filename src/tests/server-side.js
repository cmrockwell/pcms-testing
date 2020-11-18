const {Component} = require('../const')
const FEATURE_NAME = 'server-side-rendering'
const TENANT = 'pagerenderserver'
const PAGE = FEATURE_NAME
const TEMPLATE = '/content/pagerenderserver/templates/base'

Feature(FEATURE_NAME)

Before(async ({loginAs, perApi, pagesPage, editPagePage}) => {

    await loginAs('admin')
    await perApi.createPage(TENANT, PAGE, PAGE, TEMPLATE)
    
    // await perApi.addComponent(
    //         TENANT,
    //         PAGE,
    //         Component.base(TENANT),
    //         'into-into',
    //         'sample'
    //     )
    pagesPage.navigate(TENANT)    
    pagesPage.editPage(PAGE)
    // editPagePage.editViewFrame.selectFirstInlineEdit()
  })
  
  After(({perApi}) => {
    perApi.deletePage(`/content/${TENANT}/pages/${PAGE}`)
  })
  
  Scenario('add base component', ({editPagePage}) => {
    // const iconName = 'launcher-icon-1x'
    // I.dragAndDrop('#dragHandle', '#container');
    pause()
    // editPagePage.richToolbar.insertIcon(iconName)
    // editPagePage.editViewFrame.containsText(`[icon:${iconName}]`)
  })