#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const { Agent } = require('vm-agent');
const minimist = require('minimist');

const utils = require('../utils');

const args = minimist(process.argv.slice(2));
let requires = args.r || args.require;
if (requires) {
  requires = Array.isArray(requires) ? requires : [requires];
  for (const r of requires) {
    const filepath = path.resolve(process.cwd(), r);
    require(filepath);
  }
}

const { dirname, binpath } = utils.prettier;
const bin = fs.readFileSync(binpath, 'utf8');

require.main.filename = binpath;

const dummyProcess = {
  ...process,
  argv: [, , ...process.argv.slice(4)],
  exit() {},
};

const context = {
  __dirname: dirname,
  setImmediate,
  process: dummyProcess,
  require,
};
new Agent(bin.replace(/\#.*node/, ''), context).run();
