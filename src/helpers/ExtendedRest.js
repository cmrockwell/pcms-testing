const REST = require('codeceptjs/lib/helper/REST')

class ExtendedRest extends REST {

  defaultHeaders

  constructor(config) {
    super({...config, withCredentials: true})
    this.defaultHeaders = {}
  }

  addRestDefaultHeader(name, value) {
    this.headers[name] = value
  }

  /**
   * custom request send function based on the request object.
   * mainly used to minify the step-output
   * @param req
   * @returns {Promise<void>}
   */
  async sendRestRequest(req) {
    return this._executeRequest({
      baseURL: this._url(req.url),
      method: req.method,
      data: req.data,
      headers: {...req.headers, ...this.defaultHeaders},
      auth: req.auth
    })
  }
}

class Request {

  static build() {
    return new BuildableRequest()
  }

  url
  method
  data
  headers
  auth
  output

  constructor(url = '', method = 'GET', data = null,
      headers = {}, auth = null, output = null) {
    this.url = url
    this.method = method
    this.data = data
    this.headers = headers
    this.auth = auth
    this.output = output
  }

  asObject() {
    return {
      url: this.url,
      method: this.method,
      headers: this.headers,
      auth: this.auth
    }
  }

  asJson() {
    return JSON.stringify(this.toObject())
  }

  toString() {
    return (`"${this.output}"` || `${this.asJson()}`) + ` [${this.method}] `
  }
}

class BuildableRequest extends Request {

  constructor() {
    super()
  }

  withUrl(url) {
    this.url = url
    return this
  }

  withGET() {
    this.method = 'GET'
    return this
  }

  withPOST() {
    this.method = 'POST'
    return this
  }

  withPATCH() {
    this.method = 'PATCH'
    return this
  }

  withPUT() {
    this.method = 'PUT'
    return this
  }

  withDELETE() {
    this.method = 'DELETE'
    return this
  }

  withMethod(method) {
    this.method = method
    return this
  }

  withData(data) {
    this.data = data
    return this
  }

  withHeaders(headers) {
    this.headers = headers
    return this
  }

  withHeader(name, value) {
    this.headers[name] = value
    return this
  }

  withAuth(auth) {
    this.auth = auth
    return this
  }

  as(output) {
    this.output = output
    return this
  }
}

module.exports = ExtendedRest
module.exports.Request = Request