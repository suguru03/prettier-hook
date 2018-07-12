'use strict';

const path = require('path');

const utils = require('../../utils');

const { dirname } = utils.prettier;
const parserpath = path.join(dirname, 'parser-typescript');

const tsParser = require(parserpath);
const parser = tsParser.parsers.typescript.parse;

const hooks = [];

// override
tsParser.parsers.typescript.parse = (...args) => {
  const ast = parser(...args);
  return hooks.reduce((ast, func) => func(ast, ...args), ast);
};

exports.addHook = func => hooks.push(func);
