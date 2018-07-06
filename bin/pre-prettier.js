#!/usr/bin/env node
'use strict';

const vm = require('vm');
const fs = require('fs');
const path = require('path');

const dirname = process.env.DEBUG
  ? path.join(__dirname, '../node_modules')
  : Path.join(__dirname, '../../');
const binpath = path.join(dirname, 'prettier/bin-prettier.js');
const bin = fs.readFileSync(binpath, 'utf8');

require.main.filename = binpath;
const context = {
  __dirname: dirname,
  global,
  process,
  setImmediate,
  require,
  console,
  module,
};
vm.runInNewContext(bin.replace(/\#.*node/, ''), context);
