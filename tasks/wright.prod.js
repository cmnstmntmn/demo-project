console.time('build')

const fs = require('fs-extra')
    , rollup = require('rollup')
    , postcss = require('postcss')
    , commonjs = require('rollup-plugin-commonjs')
    , json = require('rollup-plugin-json')
    , nodeResolve = require('rollup-plugin-node-resolve')
    , buble = require('rollup-plugin-buble')
    , uglify = require('rollup-plugin-uglify')
    , purify = require('purify-css')

// fs.copySync('./static', './public', { clobber: true })
fs.copySync('./workspace/source/fonts', './workspace/build/fonts', { clobber: true })
fs.ensureDir('./workspace/build/css')
fs.ensureDir('./workspace/build/js')

module.exports = rollup.rollup({
    entry: 'workspace/source/js/app.js',
    plugins: [
		json(),
		commonjs(),
		nodeResolve(),
		buble(),
		uglify({ mangle: true, compress: true })
    ]
  }).then(bundle => {
    return bundle.write({
      format: 'iife',
      moduleName: 'test',
      dest: 'workspace/build/js/app.js',
      sourceMap: true      
    })
  }).catch(e => {
  console.error(e)
  process.exit(1)
})

let content = ['workspace/source/js/*.js', '*.html'];
var options = {
  output: 'workspace/build/css/app.css',
  // Will minify CSS code in addition to purify.
  minify: true,
  info: true,
  // Logs out removed selectors.
  rejected: false
};

postcss([
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
          removeAll: true
        }
      }
    )
  ])
  .process(fs.readFileSync('workspace/source/css/app.css', 'utf8'), {from: "workspace/source/css/app.css"})
  .then(result => purify(content, result.css, options))
process.on('exit', () => console.timeEnd('build'))