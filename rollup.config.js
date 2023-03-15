import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default {
  input: 'src/index.ts',

  output: [{
    file: 'dist/bundle.js',
    format: 'umd',
    name: 'H3d',
    // plugins: [terser()]
  }],
  
  plugins: [
    typescript({
      tsconfig: './tsconfig.json'
    }),
    babel(),
    nodeResolve({
      // use "jsnext:main" if possible
      // see https://github.com/rollup/rollup/wiki/jsnext:main
      jsnext: true
    })
  ],
  sourceMap: false,
};