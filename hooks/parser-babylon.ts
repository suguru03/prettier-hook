import * as path from 'path';

import * as utils from '../utils';

const { dirname } = utils.prettier;
const parserpath = path.join(dirname, 'parser-babylon');

const jsParsers = require(parserpath); // tslint:disable-line no-var-requires
const parser = jsParsers.parsers.babylon.parse;

type Hook = (...args: any[]) => any;
const hooks: Hook[] = [];

// override
jsParsers.parsers.babylon.parse = (...args) => {
  const base = parser(...args);
  return hooks.reduce((ast, func) => func(ast, ...args), base);
};

export const addHook = (func: Hook) => hooks.push(func);
