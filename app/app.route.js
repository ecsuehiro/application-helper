"use strict"

const router = require('express').Router()
const appControllerFactory = require('./app.controller')

module.exports = apiPrefix => {
    const appController = appControllerFactory(apiPrefix)

    router.get('/', appController.read)
    router.get('/:id([0-9a-fA-F]{24})', appController.readById)
    router.post('/', appController.create)
    router.put('/:id([0-9a-fA-F]{24})', appController.update)
    router.delete('/:id([0-9a-fA-F]{24})', appController.delete)

    return router
}