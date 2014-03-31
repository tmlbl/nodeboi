module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: ['src/scripts/**'],
        tasks: ['concat:dev'],
        options: {
          livereload: true
        }
      },
      scss: {
        files: ['src/styles/**'],
        tasks: ['sass:dev'],
        options: {
          livereload: true
        }
      },
      views: {
        files: ['app/views/**'],
        options: {
          livereload: true
        }
      },
      express: {
        files: ['server.js', 'app/**'],
        tasks: ['express:dev'],
        options: {
          spawn: false
        }
      }
    },
    env: {
      options: {},
      dev: {
        NODE_ENV: 'dev'
      },
      test: {
        NODE_ENV: 'test'
      }
    },
    sass: {
      dev: {
        files: {'public/styles.css': 'src/styles/main.scss'}
      },
      build: {
        files: {'public/styles.css': 'src/styles/main.scss'}
      }
    },
    concat: {
      dev: {
        src: [
          'src/scripts/index.js'
        ],
        dest: 'public/app.js'
      }
    },
    express: {
      options: {},
      dev: {
        options: {
          script: 'server.js'
        }
      },
      test: {
        options: {
          script: 'server.js'
        }
      }
    },
    casper: {
      all: {
        options: {
          test: true
        },
        files: {
          'test/casper/results.xml' : ['test/casper/*.js']
        }
      }
    },
    simplemocha: {
      options: {
        reporter: 'spec',
        slow: 200,
        timeout: 1000,
        node_env: 'test'
      },
      all: {
        src: ['test/mocha/*.js']
      }
    },
    mongoimport: {
      options: {
        db: 'test',
        host: 'localhost',
        stopOnError: false,
        collections: [
          {
            name: 'things',
            type: 'json',
            file: 'db/seeds/things.json',
            jsonArray: true,
            upsert: true,
            drop: true
          }
        ]
      }
    },
    cssmin: {
      build: {
        files: {
          'public/styles.min.css': ['public/styles.css']
        }
      }
    },
    uglify: {
      build: {
        files: {
          'public/app.min.js': ['public/app.js']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-casper');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-mongoimport');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.registerTask('default', ['express:dev', 'watch', 'env:dev']);
  grunt.registerTask('test', ['env:test', 'mongoimport', 'express:dev', 'casper:all', 'simplemocha:all']);
  grunt.registerTask('build', ['concat:dev', 'sass:build', 'uglify:build', 'cssmin:build']);
};
