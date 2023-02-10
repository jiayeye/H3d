
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';

export default {
    input: 'src/main.js',
    output: [{
        file: 'dist/bundle.js',
        format: 'umd',
        name: 'h3d'
    },
    {
        file: 'dist/bundle.min.js',
        format: 'umd',
        name: 'h3d',
        plugins: [terser()]
    }],
    plugins: [json()]
};