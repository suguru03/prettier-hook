import * as fs from 'fs';
import * as path from 'path';

const dirname = [
  // peer dependency path
  path.join(__dirname, '../../prettier'),
  // debug path
  path.join(__dirname, '../node_modules/prettier'),
  path.join(__dirname, '../../node_modules/prettier'),
].find(fs.existsSync);
if (!dirname) {
  throw new Error('prettier not found');
}
const binpath = path.join(dirname, 'bin-prettier.js');

export const prettier = { dirname, binpath };
