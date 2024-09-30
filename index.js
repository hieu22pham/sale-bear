const express = require("express")
const database = require("./config/database")
const routesApiVer1 = require("./api/v1/admin/routes/index.route")
const routesApiVer1Client = require("./api/v1/client/routes/index.route")
const bodyParser = require("body-parser")
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config()

const app = express()
const port = process.env.port

database.connect()

app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

routesApiVer1(app)
routesApiVer1Client(app)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})