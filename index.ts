import * as fs from 'fs';
import * as path from 'path';

import { Agent } from 'vm-agent';
import * as minimist from 'minimist';

import * as utils from './utils';

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

require.main!.filename = binpath;

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
