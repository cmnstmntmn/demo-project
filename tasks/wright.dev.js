const fs = require('fs-extra')
    , chokidar = require('chokidar')
    , rollup = require('rollup')
    , commonjs = require('rollup-plugin-commonjs')
    , json = require('rollup-plugin-json')
    , buble = require('rollup-plugin-buble')
    , uglify = require('rollup-plugin-uglify')    
    , nodeResolve = require('rollup-plugin-node-resolve')
    , postcss = require('postcss')
    , wright = require('wright')


fs.removeSync('workspace/build');

wright({
  main: 'http://wright-test.dev',
  debug: true,
  fps: true,
  run: 'm.redraw()',
  js: {
    watch: '/workspace/source/js/**/*.js',
    compile: roll
  },
  css: {
    watch: '/workspace/source/css/**/*.css',
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
      nodeResolve(),
      buble(),
      uglify({ mangle: true, compress: true })
    ]
  })
 .then(bundle => {
  bundle.write({
    format: 'iife',
    moduleName: 'tipografics',    
    dest: 'workspace/build/js/app.js',
    sourceMap: true
  })
}).catch(e => {
  console.error(e)
  // process.exit(1)
})   
}

function style() {
  return new Promise((resolve, reject) => {
    fs.readFile('workspace/source/css/app.css', 'utf8', (err, str) => {
      if (err)
        return reject(err)

        postcss([ 
          require('postcss-import'),          
          require('autoprefixer')({ browsers: ['last 3 versions', '> 5%', 'ie >= 10'] }),
          require('postcss-custom-properties'),
          require('postcss-mixins'),
          require('postcss-simple-vars'),
          require('postcss-color-function'),
          require('postcss-nested'),
          require('postcss-typescale'),
          require('postcss-atroot'),
		      require('postcss-button'),          
          require('cssnano')(
            {
              discardComments: {
                removeAll: false
              }
            }
          ),
          require('precss')             
        ])
        .process(str, { 
          from: 'workspace/source/css/app.css', 
          to: 'workspace/build/css/app.css',
          map: { inline: false } 
        })
        .then(function (css) {
            fs.outputFile('workspace/build/css/app.css', css.css);
            if ( css.map ) fs.outputFile('workspace/build/css/app.css.map', css.map);
        }).catch(error => {
  			console.error(error);
		});
    })
  })
}