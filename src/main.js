const { Command } = require('commander')
const { version, DIR_NAME } = require('../util/constants')
const { resolve } = require('path')

const program = new Command();

program
.option('-c, --create [name]', '创建项目', 'vue3-project')
.action(() => {
    const command = Object.entries(program.opts())[0]
    const script = require(resolve(DIR_NAME, command[0]))
    const projectName = typeof command[1] === 'string' ? command[1] : 'vue3-project'
    script(projectName)
})

program.version(version, '-v --version')
program.parse(process.argv)