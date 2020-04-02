import * as fs from 'fs';
import * as path from 'path';

const libName = 'prettier';
const dirname = [
  // peer dependency path
  '../..',
  // debug path
  '../node_modules',
  '../../node_modules',
]
  .map((dirPath) => path.join(__dirname, dirPath, libName))
  .find(fs.existsSync);
if (!dirname) {
  throw new Error('prettier not found');
}
const binpath = path.join(dirname, 'bin-prettier.js');

export const prettier = { dirname, binpath };
