const {Request} = require('../helpers/ExtendedRest')
const {ColorPalette} = require('../const')
const {I} = inject()

class PerApi {

  async createTenant(tenant, title = tenant, palette = ColorPalette.default) {
    return I.sendRestRequest(
        Request.build()
            .withUrl('/admin/createTenant.json')
            .withPOST()
            .withFormData({
              fromTenant: 'themecleanflex',
              toTenant: tenant,
              tenantTitle: title,
              colorPalette: palette
            })
            .as(`create tenant "${tenant}"`)
    )
  }

  async deleteTenant(tenant) {
    return I.sendRestRequest(
        Request.build()
            .withUrl(`/admin/deleteTenant.json`)
            .withPOST()
            .withFormData({name: tenant})
            .as(`delete tenant "${tenant}"`)
    )
  }

  async createPage(tenant, name, title = name) {
    return I.sendRestRequest(
        Request.build()
            .withUrl(`/admin/createPage.json/content/${tenant}/pages`)
            .withPOST()
            .withFormData({
              name,
              templatePath: `/content/${tenant}/templates/blank`,
              title
            })
            .as('create page')
    )
  }

  async addComponent(tenant, page, component, drop, variation) {
    const cmpShortName = component.split('/').reverse()[0]
    return I.sendRestRequest(
        Request.build()
            .withUrl(
                `/admin/insertNodeAt.json/content/${tenant}/pages/${page}/jcr:content`)
            .withPOST()
            .withFormData({component, drop, variation})
            .as(`add component "${cmpShortName}" to page "${page}"`)
    )
  }
}

module.exports = new PerApi()
module.exports.PerApi = PerApi