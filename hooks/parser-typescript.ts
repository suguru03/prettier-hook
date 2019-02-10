import * as path from 'path';

import * as utils from '../utils';

const { dirname } = utils.prettier;
const parserpath = path.join(dirname, 'parser-typescript');

const tsParser = require(parserpath);
const parser = tsParser.parsers.typescript.parse;

type Hook = (...args: any[]) => any;
const hooks: Hook[] = [];

// override
tsParser.parsers.typescript.parse = (...args) => {
  const ast = parser(...args);
  return hooks.reduce((ast, func) => func(ast, ...args), ast);
};

export const addHook = (func: Hook) => hooks.push(func);
