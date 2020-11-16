const FormData = require('form-data')
const {Request} = require('../helpers/ExtendedRest')
const {Tenant} = require('../const')
const {I} = inject()

class PerApi {

  constructor() {
    this.headers = {}
  }

  async createTenant() {
    const form = new FormData()
    form.append('fromTenant', 'themecleanflex')
    form.append('toTenant', Tenant)
    form.append('tenantTitle', Tenant)
    form.append('colorPalette',
        '/content/themecleanflex/pages/css/palettes/default.css')
    return I.sendRestRequest(
        Request.build()
            .withUrl('/admin/createTenant.json')
            .withPOST()
            .withHeaders(form.getHeaders())
            .withData(form)
            .as(`create tenant "${Tenant}"`)
    )
  }

  async deleteTenant() {
    const form = new FormData()
    form.append('name', 'pcms_testing')
    return I.sendRestRequest(
        Request.build()
            .withUrl(`admin/deleteTenant.json`)
            .withPOST()
            .withHeaders(form.getHeaders())
            .withData(form)
            .as(`delete tenant "${Tenant}"`)
    )
  }

  async createPage(name) {
    const form = new FormData()
    form.append('name', name)
    form.append('templatePath', `/content/${Tenant}/templates/blank`)
    form.append('title', name)
    return I.sendRestRequest(
        Request.build()
            .withUrl(`/admin/createPage.json/content/${Tenant}/pages`)
            .withPOST()
            .withHeaders(form.getHeaders())
            .withData(form)
            .as('create page')
    )
  }

  async deletePage(name) {
    return I.sendRestRequest(
        Request.build()
            .withUrl(`/admin/deletePage.json/content/${Tenant}/pages/${name}`)
            .withPOST()
            .as(`delete page "${name}"`)
    )
  }

  async addComponentToPage(page, component, drop, variation) {
    const cmpShortName = component.split('/').reverse()[0]
    const form = new FormData()
    form.append('component', component)
    form.append('drop', drop)
    form.append('variation', variation)
    return I.sendRestRequest(
        Request.build()
            .withUrl(
                `/admin/insertNodeAt.json/content/${Tenant}/pages/${page}/jcr:content`)
            .withPOST()
            .withHeaders(form.getHeaders())
            .withData(form)
            .as(`add component "${cmpShortName}" to page "${page}"`)
    )
  }
}

module.exports = new PerApi()
module.exports.PerApi = PerApi