const { name, version } = require('../package.json')
const { resolve } = require('path')

const DIR_NAME = resolve(__dirname, '../scripts')
const TEMPLATE_DIR = resolve(__dirname, '../templates')

module.exports = {
    name,
    version,
    DIR_NAME,
    TEMPLATE_DIR
}