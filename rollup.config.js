import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

function version(name) {
  return `${name} v${require(`${name}/package.json`).version}`
}

const banner = `
/**
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author.name} <${pkg.author.email}> (${
  pkg.author.url
})
 * @license ${pkg.license}
 * @description Built with ${version('rollup-plugin-vue')} and ${version(
  'vue-template-compiler'
)}
 */`.trim()

const plugins = [babel(), resolve()]

export default [
  {
    input: 'src/entries/module.js',
    plugins: [vue({ template: { optimizeSSR: true } })].concat(plugins),
    output: [
      {
        banner,
        format: 'cjs',
        file: pkg.main,
      },
    ],
  },
  {
    input: 'src/entries/module.js',
    plugins: [vue()].concat(plugins),
    output: [
      {
        banner,
        format: 'es',
        file: pkg.module,
      },
    ],
  },
  {
    input: 'src/entries/module.js',
    plugins: [vue(), terser()]
      .concat(plugins)
      .concat(replace({ 'process.env.NODE_ENV': '"production"' })),
    output: [
      {
        banner,
        format: 'es',
        file: pkg.module.replace('.js', '.es.min.js'),
      },
    ],
  },
  {
    input: 'src/entries/browser.js',
    plugins: [vue(), terser()]
      .concat(plugins)
      .concat(replace({ 'process.env.NODE_ENV': '"production"' })),
    output: [
      {
        banner,
        name: 'LazyImage',
        format: 'iife',
        file: pkg.unpkg,
      },
    ],
  },
]
