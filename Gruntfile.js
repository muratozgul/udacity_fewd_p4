module.exports = function(grunt) {

  // Display the elapsed execution time of grunt tasks
  require('time-grunt')(grunt);
  // Load all grunt-* packages from package.json
  require('load-grunt-tasks')(grunt);
 
  // Project configuration
  grunt.initConfig({

    // This line makes your node configurations available for use
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },

    paths: {
      src: {
        js: 'src/js',
        css: 'src/css',
        jsAll: 'src/js/**/*.js',
        cssAll: 'src/css/**/*.css'
      },
      dest: {
        js: 'dist/js',
        jsMin: 'dist/js/main.min.js',
        css: 'dist/css',
        cssMin: 'dist/css/style.min.css'
      }
    },

    jshint: {
      files: ['<%= paths.src.jsAll %>'],
      options: {
        // options here to override JSHint defaults
      }
    },

    uglify: {
      options: {
        compress: {},
        mangle: true,
        sourceMap: true,
        banner: '<%= meta.banner %>'
      },
      static_mappings: {
        // Because these src-dest file mappings are manually specified, every
        // time a new file is added or removed, the Gruntfile has to be updated.
        files: [
          {src: '<%= paths.src.js %>/perfmatters.js', dest: '<%= paths.dest.jsMin %>'}
        ]
      },
      dynamic_mappings: {
        // Grunt will search for "**/*.js" under "lib/" when the "uglify" task
        // runs and build the appropriate src-dest file mappings then, so you
        // don't need to update the Gruntfile when files are added or removed.
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: 'src/',      // Src matches are relative to this path.
            src: ['**/*.js'], // Actual pattern(s) to match.
            dest: 'dist/',   // Destination path prefix.
            ext: '.min.js',   // Dest filepaths will have this extension.
            extDot: 'first'   // Extensions in filenames begin after the first dot
          },
        ]
      }
    },

    cssmin: {
      static_mappings: {
        files: {
          '<%= paths.dest.css %>/style.min.css': ['<%= paths.src.css %>/style.css'],
          '<%= paths.dest.css %>/print.min.css': ['<%= paths.src.css %>/print.css']
        }
      }
    },
    
    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          newFilesOnly: true,
          sizes: [{
            name: 'small',
            width: '30%',
            suffix: '_small',
            quality: 20
          },{
            name: 'large',
            width: '50%',
            suffix: '_large',
            quality: 40
          }]
        },
        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: 'src/img/',
          dest: 'dist/img/'
        }]
      }
    }

  });

  // the default task can be run just by typing "grunt" on the command line
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('hint', ['jshint']);
  grunt.registerTask('jscomp', ['uglify:static_mappings']);
  grunt.registerTask('csscomp', ['cssmin:static_mappings']);
  grunt.registerTask('imgcomp', ['responsive_images:dev']);
    
};