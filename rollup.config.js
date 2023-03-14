import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
    input: 'src/main.js',
    output: [{
        file: 'dist/bundle.js',
        format: 'umd',
        name: 'h3d',
        plugins: [terser()]
    }],
    plugins: [
        babel(),
        nodeResolve({
          // use "jsnext:main" if possible
          // see https://github.com/rollup/rollup/wiki/jsnext:main
          jsnext: true
        })
      ],
      sourceMap: false,
};