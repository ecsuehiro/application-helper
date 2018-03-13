"use strict"

const { MongoClient, ObjectId } = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()

let conn
const url = process.env.MONGODB_URL

MongoClient.connect(url)
    .then(client => {
        let dbName = url.substr(url.lastIndexOf('/') + 1)
        conn = client.db(dbName)
    })

module.exports = {
    read: _read,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}

function _read() {
    return conn.collection("applications").find({ dateDeleted: null }).toArray()
        .then(apps => {
            for (let i = 0; i < apps.length; i++){
                const app = apps[i]
                app._id = app._id.toString()
            }
            return apps
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _readById(id) {
    return conn.collection("applications").findOne({ _id: new ObjectId(id), dateDeleted: null })
        .then(app => {
            app._id = app._id.toString()
            return app
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _create(data) {
    let document = {
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        siteUsed: data.siteUsed,
        status: data.status,
        employerInfo: data.employerInfo,
        dateApplied: new Date(),
        dateUpdated: null,
        dateDeleted: null
    }

    return conn.collection("applications").insertOne(document)
        .then(app => {
            return app.insertedId.toString()
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}

function _update(id, data) {
    let document = {
        $set: {
            companyName: data.companyName,
            jobTitle: data.jobTitle,
            siteUsed: data.siteUsed,
            status: data.status,
            employerInfo: data.employerInfo,
            dateUpdated: new Date()
        }
    }

    return conn.collection("applications").updateOne({ _id: new ObjectId(id) }, document)
        .then(response => {
            return response
        })
        .catch(error => {
            console.warn(error)
            return Promise.reject(error)
        })
}

function _delete(id) {
    let document = {
        $set: {
            dateUpdated: new Date(),
            dateDeleted: new Date()
        }
    }
    return conn.collection("applications").updateOne({ _id: new ObjectId(id) }, document)
        .then(app => {
            console.log("Deleted")
        })
        .catch(err => {
            console.warn(err)
            return Promise.reject(err)
        })
}