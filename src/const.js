module.exports = {
  Component: {
    richText: (tenant) => `/apps/${tenant}/components/richtext`,
    base: (tenant) => `/apps/${tenant}/components/base`,
  },
  ColorPalette: {
    default: '/content/themecleanflex/pages/css/palettes/default.css'
  }
}