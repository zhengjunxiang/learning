const { parse } = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const fs = require('fs')

class WebpackI18nPlugin {
  constructor (options) {
    this.options = options || {}
    this.tempTranslation = []
  }

  apply (compiler) {
    compiler.hooks.afterCompile.tapAsync('WebpackI18nPlugin', (compilation, callback) => {
      compilation.modules.forEach((module) => {
        if (!module.resource) return
        if (module.resource.includes('node_modules')) return
        if (!(module.resource.endsWith('.tsx') || module.resource.endsWith('.jsx'))) return

        const originalCode = fs.readFileSync(module.resource, 'utf8')

        const ast = parse(originalCode, {
          sourceType: 'unambiguous',
          plugins: ['jsx', 'typescript'],
        })

        traverse(ast, {
          Program: (path, state) => {
            let _i18nFnName = []
            let _banProps = this.options.banProps || ['placeholder']

            path.traverse({
              VariableDeclaration (variablePath) {
                const { node } = variablePath
                node.declarations.forEach((declaration) => {
                  if (t.isObjectPattern(declaration.id)) {
                    declaration.id.properties.forEach((property) => {
                      if (
                        t.isIdentifier(property.key, { name: 't' }) &&
                        (t.isIdentifier(property.value) || t.isAssignmentPattern(property.value))
                      ) {
                        const tVariableName = t.isIdentifier(property.value)
                          ? property.value.name
                          : property.value.left.name

                        !_i18nFnName.includes(tVariableName) && _i18nFnName.push(tVariableName)
                      }
                    })
                  }
                })
              },
              CallExpression: (callPath) => {
                const { node } = callPath
                if (
                  !node.shouldSkip &&
                  node.callee.type === 'Identifier' &&
                  _i18nFnName.includes(node.callee.name) &&
                  node.arguments.length >= 1
                ) {
                  const isInBan = callPath.findParent(
                    (p) => t.isJSXAttribute(p) && _banProps.includes(p.node?.name?.name)
                  )

                  if (isInBan) {
                    node.shouldSkip = true
                    return
                  }
                  const firstArgumentValue = node.arguments[0].value
                  const secondArgument = node.arguments[1]

                  // 获取待翻译文案
                  if (!firstArgumentValue && secondArgument) {
                    const secondArgumentValue = secondArgument.value
                    if (!this.tempTranslation.includes(secondArgumentValue)) {
                      this.tempTranslation.push(secondArgumentValue)
                    }
                  }

                  // 打上标记防止嵌套循环
                  node.shouldSkip = true
                }
              },
            })
          },
        })
      })

      callback()
    })

    compiler.hooks.emit.tapAsync('WebpackI18nPlugin', (compilation, callback) => {
      const htmlFileName = this.options.htmlFileName || 'index.html'
      const htmlAsset = compilation.assets[htmlFileName]

      if (htmlAsset) {
        let htmlContent = htmlAsset.source()

        const customScript = `<script id="_I18NTEMPTRANSLATIONS">window._I18NTEMPTRANSLATIONS = ${JSON.stringify(
          this.tempTranslation
        )}</script>`
        htmlContent = htmlContent.replace('</head>', `${customScript}</head>`)

        compilation.assets[htmlFileName] = {
          source: () => htmlContent,
          size: () => htmlContent.length,
        }
      }

      callback()
    })
  }
}

module.exports = WebpackI18nPlugin
