const productRouter = require("./product.route")
const errorRouter = require("./error404.route")
const roleRouter = require("./role.route")

module.exports = (app) => {
  const version = "/api/v1"

  app.use(version + '/products', productRouter)
  app.use(version + '/roles', roleRouter)
  app.use(version + '/error404', errorRouter)

}