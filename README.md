# Prettier Hook

The library allows modifying the AST before executing Prettier.

```js
// index.js
const { addHook } = require('prettier-hook/hooks/parser-typescript');

function parse(ast) {
  // hack the AST!
  return ast;
}
```

```sh
yarn prettier-hook --require index.js <filepath>
```
