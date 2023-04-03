const { join } = require('path')
const allure = require('allure-commandline')
const video = require('wdio-video-reporter')

exports.config = {
    user: 'yourUser',
    key: 'yourKey',
    services: ['browserstack'],
    specs: [
        './test/specs/*.spec.js'
    ],
    suites: {
        products: [
            './test/specs/products.spec.js',
            './test/specs/search.spec.js',
            './test/specs/productBuyflow.spec.js'
        ]
    },
    maxInstances: 1,
    framework: 'mocha',
    capabilities: [{
        "app": "bs://cd1f2163bc9f7746ab401e06ad71fac819f92b2e",
        "device": "iPhone 12 Pro",
        "os_version": "14",
        "project": "Automação iOS em Device Farm",
        "build": "browserstack-build-2",
        "name": "adiciona_produto",
        'browserstack.debug': true
    }],
    waitForTimeout: 20000,
    mochaOpts: {
        timeout: 300000
    },
    reporters: ['spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        [video, {
            saveAllVideos: false,       // If true, also saves videos for successful test cases
            videoSlowdownMultiplier: 50, // Higher to get slower videos, lower for faster videos [Value 1-100]
        }]
    ],
    onComplete: function () {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    },
    afterStep: async function (step, scenario, { error, duration, passed }, context) {
        await driver.takeScreenshot();
    },
    beforeSuite: async function () {
        // verificar se o app já está instalado e executando
        let state = await driver.queryAppState("br.art.ebaconline")
        if (state !== 4) {
            await driver.launchApp()
        }
    },
    afterSuite: async function () {
        // fechar app
        await driver.closeApp()
    }
}