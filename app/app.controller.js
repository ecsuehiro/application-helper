"use strict"

const appService = require('./app.service')

let _apiPrefix

module.exports = apiPrefix => {
    _apiPrefix = apiPrefix

    return {
        read: _read,
        readById: _readById,
        create: _create,
        update: _update,
        delete: _delete
    }
}

function _read(req, res) {
    appService.read()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _readById(req, res) {
    appService.readById(req.params.id)
        .then(response => {
            res.status(200).json(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500).send(err)
        })
}

function _create(req, res) {
    appService.create(req.body)
        .then(response => {
            console.log("Created")
            res.status(201).send(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500)
        })
}

function _update(req, res) {
    appService.update(req.params.id, req.body)
        .then(response => {
            console.log("Updated")
            res.status(200).send(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500)
        })
}

function _delete(req, res) {
    appService.delete(req.params.id)
        .then(response => {
            console.log("Deleted")
            res.status(200).send(response)
        })
        .catch(err => {
            console.warn(err)
            res.status(500)
        })
}