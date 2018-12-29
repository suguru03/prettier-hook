# Prettier Hook

The library allows to modify the AST before executing Prettier.

```js
// index.js
const { addHook } = require('prettier-hook/hooks/parser-typescript');

function parse(ast) {
  // modify AST
  return ast;
}

addHook(parse);
```

```sh
npx prettier-hook --require index.js <filepath>
// or
yarn prettier-hook --require index.js <filepath>
```

## Use case

- [typeg](https://github.com/suguru03/typeg)
