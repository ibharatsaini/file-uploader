const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const googleOAuth = require("./utils/googleObj")
const cookieParser = require("cookie-parser")

dotenv.config({path:"./.env"})

exports.oauth2Client = googleOAuth() 

const app = express()


const googleRoutes = require("./router/google.routes")
const amazonRoutes = require("./router/amazon.routes")
const userRouter = require("./router/user.routes")
const errorHandler = require("./middleware/errorHandler")


app.use(cors())
app.use(express.json())
app.use(cookieParser())


app.use(`/api/v1/google`,googleRoutes)
app.use(`/api/v1/amazon`,amazonRoutes)
app.use(`/api/v1/user`,userRouter)


//errorhandler
app.use(errorHandler())
module.exports = app