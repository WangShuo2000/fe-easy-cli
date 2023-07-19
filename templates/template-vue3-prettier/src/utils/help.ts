export const findAllItem = <T = any>(tree: any, judgeFunction: Function, flush: Recordable) => {
    const { children } = Object.assign({
        id: 'id',
        children: 'children',
        pid: 'pid',
    }, flush)
    const list = [...tree]
    const res: T[] = []
    for (const item of list) {
        judgeFunction(item) && res.push(item)
        item[children] && list.push(...[item[children]])
    }
    return res
}