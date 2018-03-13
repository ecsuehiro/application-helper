"use strict"

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient, ObjectId } = require('mongodb')
const dotenv = require('dotenv')
const mainRouter = require('./index.js')
const applicationApiPrefix = '/api/application'
const applicationsRoutes = require('./app/app.route')(applicationApiPrefix)
const clientRoutes = require('./app/app.client.route')

const path = require("path")
const contentPath = path.join(__dirname, "./")
app.use(express.static(contentPath))

dotenv.config()

const port = process.env.PORT || 8080
const url = process.env.MONGODB_URL

app.use(bodyParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(applicationApiPrefix, applicationsRoutes)

app.listen(port, (err) => {
    if (err) {
        console.error(err)
        process.exit(1)
    } else {
        console.log(`Listening on port: ${port}`)
    }
})


useAPIErrorHandlers(app)

app.use(clientRoutes)

function useAPIErrorHandlers(router) {
    router.use('/api/*', (req, res, next) => {
        res.sendStatus(404)
    })
    router.use((err, req, res, next) => {
        if (!err) {
            return next()
        }
        console.log(err.stack)
        res.sendStatus(500)
    })
}
