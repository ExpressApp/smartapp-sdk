import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import rollupJson from '@rollup/plugin-json'

export default {
  input: 'build/module/index.js',
  output: {
    dir: 'build/umd',
    name: 'SmartAppBridge',
    format: 'umd',
  },
  plugins: [
    nodeResolve({ preferBuiltins: false }),
    commonjs(),
    rollupJson(),
  ],
}
