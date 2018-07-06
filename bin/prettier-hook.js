#!/usr/bin/env node
'use strict';

const vm = require('vm');
const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

const utils = require('../utils');

const args = minimist(process.argv.slice(2));
let req = args.r || args.require;
if (req) {
  req = Array.isArray(req) ? req : [req];
  req.forEach(r => {
    const filepath = path.resolve(process.cwd(), r);
    require(filepath);
  });
}

const { dirname, binpath } = utils.prettier;
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
