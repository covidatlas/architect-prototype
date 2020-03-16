module.exports = function body(params) {
  let { content, name } = params
  name = name ? ` - ${name}` : ''
  return /* html */`
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>COVID-19 Atlas${name}</title>
  </head>
  <body>
    <pre>${content}</pre>
  </body>
</html>
`
}
