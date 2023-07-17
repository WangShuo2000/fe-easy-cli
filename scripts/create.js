const { existsSync, mkdirSync, cp } = require('fs')
const { join } = require('path')
const { TEMPLATE_DIR } = require('../util/constants')
const { blue, red } = require('kolorist')
const prompts = require('../util/prompts')

module.exports = async function(targetDirectory) {
    try {
        const res = await prompts(targetDirectory)
        const { framework, varient, projectName } = res
        const root = join(process.cwd(), projectName)
        console.info(blue(`\ninit project in ${root}...`));
        const template = varient.value || framework.value
        if (!existsSync(root)) {
            mkdirSync(root)
        }
        const templateDir = join(TEMPLATE_DIR, 'template-' + template)
        cp(templateDir, root, {
            recursive: true
        }, (error) => {
            error && console.error(red(error))
        })
        console.info(blue('\n创建成功，请执行以下命令\n'))
        console.log(`    cd ${projectName}\n`)
        console.log('    npm install\n')
        console.log('    npm run dev\n')
    } catch (error) {
        console.error(red(error))
        return
    }
}