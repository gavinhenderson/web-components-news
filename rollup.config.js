import resolve from 'rollup-plugin-node-resolve';

export default {
  input: ['src/index.js', 'src/polyfills.js'],
  output: {
    dir: 'docs',
    format: 'es',
    sourcemap: false,
  },
  plugins: [resolve()],
};
