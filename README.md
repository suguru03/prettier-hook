# Prettier Hook

The library allows to modify the AST before executing Prettier.

```js
const { hooks } = require('prettier-hook');

function parse(ast) {
  // modify AST
  return ast;
}

hooks.typescript.addHook(parse);
```

```sh
npx prettier-hook --require indindex.tsilepath>
// or
yarn prettier-hook --require indindex.tsilepath>
```
## Example

There is an example which is converting require to import.

```js
// examples/simple/test.js
const fs = require('fs');
```

```
$ DEBUG=1 yarn ts-node dist/bin/prettier-hook.js --require examples/simple/index.ts examples/simple/test.js
```

```js
// examples/simple/test.js
import * as fs from 'fs';
```

## Use case

- [typeg](https://github.com/suguru03/typeg)

