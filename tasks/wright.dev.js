const fs = require('fs-extra')
    , rollup = require('rollup')
    , commonjs = require('rollup-plugin-commonjs')
    , json = require('rollup-plugin-json')
    , nodeResolve = require('rollup-plugin-node-resolve')
    , postcss = require('postcss')
    , wright = require('wright')

fs.removeSync('workspace/build')

wright({
  main: 'http://wright-test.dev',
  debug: true,
  fps: true,
  run: 'm.redraw()',
  js: {
    watch: 'workspace/source/js/**/*.js',
    compile: roll
  },
  css: {
    watch: 'workspace/source/css/**/*.css',
    compile: style
  },
  watch: ['**/*.html']
})

function roll() {
  return rollup.rollup({
    entry: 'workspace/source/js/app.js',
    plugins: [
      json(),
      commonjs(),
      nodeResolve()
    ]
  }).then(bundle => {
    return bundle.generate({
      format: 'iife',
      moduleName: 'test'
    }).code
  })
}

function style() {
  return postcss([
    require('postcss-import')(),
    require('autoprefixer')({ browsers: ['last 3 versions', '> 5%', 'ie >= 10'] }),
    require('postcss-custom-properties'),
    require('postcss-mixins'),
    require('postcss-color-function'),
    require('postcss-nested'),
    require('postcss-typescale'),
    require('postcss-atroot'),
    require('postcss-simple-vars'),   
    require('postcss-button'),
    require('cssnano')(
      {
        discardComments: {
          removeAll: false
        }
      }
    )
  ])
  .process(fs.readFileSync('workspace/source/css/app.css', 'utf8'), {from: "workspace/source/css/app.css"})
  .then(result => result.css)
}
