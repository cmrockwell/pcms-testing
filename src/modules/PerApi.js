const {Request} = require('../helpers/ExtendedRest')
const {Tenant, ColorPalette} = require('../const')
const {I} = inject()

class PerApi {

  constructor() {
    this.headers = {}
  }

  async createTenant() {
    return I.sendRestRequest(
        Request.build()
            .withUrl('/admin/createTenant.json')
            .withPOST()
            .withFormData({
              fromTenant: 'themecleanflex',
              toTenant: Tenant,
              tenantTitle: Tenant,
              colorPalette: ColorPalette.default
            })
            .as(`create tenant "${Tenant}"`)
    )
  }

  async deleteTenant() {
    return I.sendRestRequest(
        Request.build()
            .withUrl(`/admin/deleteTenant.json`)
            .withPOST()
            .withFormData({name: Tenant})
            .as(`delete tenant "${Tenant}"`)
    )
  }

  async createPage(name) {
    return I.sendRestRequest(
        Request.build()
            .withUrl(`/admin/createPage.json/content/${Tenant}/pages`)
            .withPOST()
            .withFormData({
              name,
              templatePath: `/content/${Tenant}/templates/blank`,
              title: name
            })
            .as('create page')
    )
  }

  async addComponentToPage(page, component, drop, variation) {
    const cmpShortName = component.split('/').reverse()[0]
    return I.sendRestRequest(
        Request.build()
            .withUrl(
                `/admin/insertNodeAt.json/content/${Tenant}/pages/${page}/jcr:content`)
            .withPOST()
            .withFormData({component, drop, variation})
            .as(`add component "${cmpShortName}" to page "${page}"`)
    )
  }
}

module.exports = new PerApi()
module.exports.PerApi = PerApi