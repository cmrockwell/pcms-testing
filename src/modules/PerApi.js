const FormData = require('form-data')
const {Tenant} = require('../const')
const {I} = inject()

class PerApi {

  constructor() {
    this.headers = {}
  }

  async getHeaders(additional) {
    const authCookie = await I.grabCookie('sling.formauth')
    return {
      'Cookie': `${authCookie.name}=${authCookie.value}`,
      ...additional
    }
  }

  async createPage(name) {
    const form = new FormData()
    form.append('name', name)
    form.append('templatePath', `/content/${Tenant}/templates/blank`)
    form.append('title', name)
    return I.sendPostRequest(
        `/admin/createPage.json/content/${Tenant}/pages`,
        form,
        await this.getHeaders(form.getHeaders())
    )
  }

  async deletePage(name) {
    return I.sendPostRequest(
        `/admin/deletePage.json/content/${Tenant}/pages/${name}`,
        null,
        await this.getHeaders()
    )
  }

  async addComponentToPage(page, component, drop, variation) {
    const form = new FormData()
    form.append('component', component)
    form.append('drop', drop)
    form.append('variation', variation)
    return I.sendPostRequest(
        `/admin/insertNodeAt.json/content/${Tenant}/pages/${page}/jcr:content`,
        form,
        await this.getHeaders(form.getHeaders())
    )
  }
}

module.exports = new PerApi()
module.exports.PerApi = PerApi