const add = (a, b) => a + b

// 词法分析器
const tokenizer = (code) => {
  const tokens = [] // 存储语法单元

  let curret = 0

  while (curret < code.length) {
    const char = code[curret]

    // ()语法单元
    if (char === '(' || char === ')') {
      tokens.push({
        type: 'parens',
        value: char
      })
      curret++
      continue
    }

    // _, $ 字母 语法单元
    if (/[a-zA-Z\$\_]/.test(char)) {
      let value = ''
      value += char
      curret++

      while (/[a-zA-Z0-9\$\_]/.test(code[curret]) && curret < code.length) {
        value += code[curret]
        curret++
      }

      tokens.push({
        type: 'identifier',
        value,
      })

      continue
    }

    // 空白字符
    if (/\s/.test(char)) {
      let value = ''
      value += char
      curret++

      while (/\s/.test(code[curret]) && curret < code.length) {
        value += code[curret]
        curret++
      }

      tokens.push({
        type: 'whitespace',
        value,
      })

      continue
    }

    // 运算符
    if (/=|\+|>/.test(char)) {
      let value = ''
      value += char
      curret++

      while (/=|\+|>/.test(code[curret])) {
        value += code[curret]
        curret++
      }

      if (value === '=>') {
        tokens.push({
          type: 'ArrowFunctionExpression',
          value
        })
        continue
      }

      tokens.push({
        type: 'operator',
        value
      })

      continue
    }

    // 逗号
    if (/,/.test(char)) {
      tokens.push({
        type: ',',
        value: ','
      })
      curret++
      continue
    }

  }

  return tokens
}


const result = tokenizer('const add = (a, b) => a + b')


// 语法分析
const parser = tokens => {
  let current = -1 // 全时指针
  const tem = []

  let token = tokens[current]

  // 解析函数声明
  const parseDeclarations = () => {
    setTem()
    next()

    // 如果字符为‘const’那就是一个声明
    if (token.type === 'identifier' && token.value === 'const') {
      const declarations = {
        type: 'VariableDeclarations',
        kind: token.value
      }

      next()

      if (token.type !== 'identifier') {
        throw new Error('Expected Variable after const')
      }

      declarations.identifierName = token.value

      next()

      if (token.type === 'operator' && token.value === '=') {
        declarations.init = parseFunctionExpression() // 解析=后面的整个函数表达式
      }

      return declarations
    }


  }

  // 解析函数体
  const parseFunctionExpression = () => {
    next()

    let init;
    // 等号后面接的是表达式
    if ((token.type === 'parens' && token.value === '(') || token.type === 'identifier') {
      setTem()
      next()
      while (token.type === 'identifier' || token.type === ',') {
        next()
      }

      if (token.type === 'parens' && token.value === ')') {
        next()

        if (token.type === 'ArrowFunctionExpression') {
          init = {
            type: 'ArrowFunctionExpression',
            params: [],
            body: {}
          }

          backTem()

          // 解析参数
          init.params = parseParams()

          init.body = parseExpression()

        } else {
          backTem()
        }

      }
    }

    return init
  }


  const parseParams = () => {
    const params = []
    if (token.type === 'parens' && token.value === '(') {
      next()
      while (token.type !== 'parens' && token.value !== ')') {
        if (token.type === 'identifier') {
          params.push({
            type: token.type,
            identifierName: token.value
          })
        }
        next()
      }
    }
    return params
  }
  const parseExpression = () => {
    next()
    let body;
    while (token.type === 'ArrowFunctionExpression') {
      next()
    }

    if (token.type === 'identifier') {
      body = {
        type: 'BenaryExpression',
        left: {
          type: 'identifier',
          identifierName: token.value
        },
        operator: '',
        right: {
          type: '',
          identifierName: ''
        }
      }
      next()
      if (token.type === 'operator') {
        body.operator = token.value
      }
      next()
      if (token.type === 'identifier') {
        body.right = {
          type: 'identifier',
          identifierName: token.value
        }
      }
    }
    return body
  }
  const setTem = () => {
    tem.push(current)
  }
  const next = () => {
    do {
      ++current
      token = tokens[current] ? tokens[current] : { type: 'eof', value: '' }
    } while (token.type === 'whitespace');
  }
  const backTem = () => {
    current = tem.pop()
    token = tokens[current]
  }

  const ast = {
    type: 'Program',
    body: []
  }

  while(current < tokens.length) {
    const statement = parseDeclarations()
    if (!statement) {
      break
    }
    ast.body.push(statement)
  }

  return ast
}


console.log(parser(result));



// AST的转换

// 需要有一个遍历器

