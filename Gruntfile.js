'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      srcAssets: 'src/',
      srcJs: '<%= project.srcAssets %>js/',
      srcSass: '<%= project.srcAssets %>sass/',
      srcCss: '<%= project.srcAssets %>css/',
      minAssets: 'min/',
      minJs: '<%= project.minAssets %>js/',
      minCss: '<%= project.minAssets %>css/',
      doc: 'doc/'
    },
    uglify: {
      production: {
        files: [{
          expand: true,
          cwd: '<%= project.srcJs %>',
          src: '**/*.js',
          dest: '<%= project.minJs %>'
        }]
      }
    },
    compass: {
      dev: {
        options: {
          sassDir: '<%= project.srcSass %>',
          cssDir: '<%= project.srcCss %>'
        }
      },
      min: {
        options: {
          outputStyle: 'compressed',
          sassDir: '<%= project.srcSass %>',
          cssDir: '<%= project.minCss %>'
        }
      }
    },
    'jsdoc-ng' : {
      'mysubtaskname' : {
        src: ['<%= project.srcJs %>*.js', 'README.md'],
        dest: 'docs',
        template : 'jsdoc-ng'
      }
    },
    watch: {
      uglify: {
        files: '<%= project.srcJs %>{,*/}*.js',
        tasks: ['uglify', 'jsdoc-ng']
      },
      compass: {
        files: '<%= project.srcSass %>{,*/}*.{scss,sass}',
        tasks: ['compass']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-jsdoc-ng');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', []);
};