const path = require('path');
const builtins = require('rollup-plugin-node-builtins');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const { entryFolder, packageFolder } = require('./paths');
const originalPackageInfo = require(path.join(process.cwd(), 'package.json'));

module.exports = {
  input: path.join(entryFolder, 'index.js'),
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      preferBuiltins: true,
    }),
    builtins(),
    commonjs(),
  ],
  external: [...Object.keys(originalPackageInfo.dependencies), 'path'],
};
