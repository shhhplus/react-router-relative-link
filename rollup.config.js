import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/components/index.js',
  output: {
    file: 'dist/index.js',
    format: 'amd',
    sourcemap: true,
  },
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
  external: ['path', 'react', 'react-router', 'react-router-dom'],
};
