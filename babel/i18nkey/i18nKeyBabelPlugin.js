// const generator = require('@babel/generator').default
const t = require('@babel/types')

// 保持i18n函数会用到的名称
let _i18nFnName = []

// 禁止进行外层添加标签的属性
let _banProps = ['placeholder']

module.exports = function () {
  return {
    visitor: {
      Program: {
        enter (path, state) {
          _i18nFnName = []
          // 获取传入的参数
          const { i18nFnName, banProps } = state.opts
          // 使用参数
          _i18nFnName = i18nFnName || _i18nFnName
          _banProps = banProps || _banProps
          // 获取文件名称
          // const filename = state.file.opts.filename || 'Unknown'
          // console.log('--- Processing file --- \n', filename)
        },
        // exit (path, state) {
        // 生成代码并打印
        //   const code = generator(path.node)
        //   console.log('--- AssignmentExpression generator code  --- \n', code)
        // },
      },
      VariableDeclaration (path) {
        const { node } = path

        // 遍历 VariableDeclaration 的声明
        node.declarations.forEach(declaration => {
          // 判断是否是解构赋值语句
          if (t.isObjectPattern(declaration.id)) {
            // 遍历解构赋值语句的属性
            declaration.id.properties.forEach(property => {
              // 判断是否是 t 属性
              if (
                t.isIdentifier(property.key, { name: 't' }) &&
                (t.isIdentifier(property.value) || t.isAssignmentPattern(property.value))
              ) {
                // 获取 t 变量名
                const tVariableName = t.isIdentifier(property.value)
                  ? property.value.name
                  : property.value.left.name

                !_i18nFnName.includes(tVariableName) && _i18nFnName.push(tVariableName)
              }
            })
          }
        })
      },
      CallExpression (path) {
        const { node } = path

        // 判断是否是 t 函数调用
        if (
          !node.shouldSkip &&
          node.callee.type === 'Identifier' &&
          _i18nFnName.includes(node.callee.name) &&
          node.arguments.length >= 1
        ) {
          // 判断是否在 placeholder 属性中
          const isInBan =  path.findParent((p) => t.isJSXAttribute(p) && _banProps.includes(p.node?.name?.name))

          if (isInBan) {
            node.shouldSkip = true
            return
          }

          // 获取 t() 的第一个参数
          const firstArgument = node.arguments[0]

          // 创建新的 JSX 元素节点
          const jsxElement = t.jsxElement(
            t.jsxOpeningElement(t.jsxIdentifier('span'), [
              t.jsxAttribute(t.jsxIdentifier('data-i18nkey'), t.jsxExpressionContainer(firstArgument)),
            ]),
            t.jsxClosingElement(t.jsxIdentifier('span')),
            [
              t.jsxExpressionContainer(node),
            ],
            false
          )

          // 打上标记防止嵌套循环
          node.shouldSkip = true
          path.replaceWith(jsxElement)

        }
      },
    },
  }
}
