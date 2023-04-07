const { join } = require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter')

exports.config = {
    /// bs
    user: '',
    key: '',
    services: ['browserstack'],

    /// sauce
    /// ???


    capabilities: [{
        "app": "",
        "device": "iPhone 12 Pro",
        "os_version": "14",
        "project": "Automação iOS em Device Farm",
        "build": "browserstack-build-2",
        "name": "adiciona_produto",
        'browserstack.debug': true
    }]
}