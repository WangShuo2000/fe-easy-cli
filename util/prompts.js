const prompts = require('prompts')
const { green, blue, lightBlue } = require('kolorist')

module.exports = async function(targetDirectory) {
    const frameworks = [
        {
            name: 'vue',
            color: green,
            variants: [
                {   
                    name: 'vue3-prettier-后台',
                    value: 'vue3-prettier',
                    color: blue
                }
            ]
        }
    ]

    const final = await prompts([
        {
            type: 'text',
            name: 'projectName',
            message: '项目名:',
            initial: targetDirectory || 'vue3-project'
        },
        {
            type: 'select',
            name: 'framework',
            message: '选择模版:',
            initial: 0,
            choices: frameworks.map(item => ({
                title: lightBlue(item.name),
                value: item
            }))
        },
        {
            type: 'select',
            name: 'varient',
            message: '选择类型:',
            choices: (framework) => framework.variants.map(item => ({
                title: lightBlue(item.name),
                value: item
            }))
        }
    ])
    
    return final
}