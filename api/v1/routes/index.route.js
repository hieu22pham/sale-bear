const productRouter = require("./product.route")
const errorRouter = require("./error404.route")
const roleRouter = require("./role.route")
const accountRouter = require('./account.route')
const authMiddleWare = require('././../middlewares/auth.middleware')
const ProductCategoryRouter = require("./product-category.route")

module.exports = (app) => {
  const version = "/api/v1"

  app.use(version + '/products', authMiddleWare.requireAuth, productRouter)
  app.use(version + '/products-category', ProductCategoryRouter)
  app.use(version + '/roles', authMiddleWare.requireAuth, roleRouter)
  app.use(version + '/accounts', accountRouter)
  app.use(version + '/error404', errorRouter)

}