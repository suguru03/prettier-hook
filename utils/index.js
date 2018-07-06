'use strict';

const path = require('path');

const dirname = process.env.DEBUG
  ? path.join(__dirname, '../node_modules/prettier')
  : path.join(__dirname, '../../prettier');
const binpath = path.join(dirname, 'bin-prettier.js');

exports.prettier = { dirname, binpath };
