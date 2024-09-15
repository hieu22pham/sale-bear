const productRouter = require("./product.route")

module.exports = (app) => {
  const version = "/api/v1"

  app.use(version + '/products', productRouter)
}