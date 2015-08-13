'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      srcAssets: ['src/'],
      srcJs: ['<%= project.srcAssets %>js/'],
      srcSass: ['<%= project.srcAssets %>sass/'],
      srcCss: ['<%= project.srcAssets %>css/'],
      minAssets: ['min/'],
      doc: ['doc/']
    },
    compass: {
      dev: {
        options: {
          sassDir: '<%= project.srcSass %>',
          cssDir: '<%= project.srcCss %>'
        }
      }
    },
    'jsdoc-ng' : {
      'mysubtaskname' : {
        src: ['<%= project.srcJs %>*.js', 'README.md'],
        dest: 'docs',
        template : 'jsdoc-ng'
        // options: {
        //   // ... 
        // }
      }
    },
    watch: {
      compass: {
        files: '<%= project.srcSass %>{,*/}*.{scss,sass}',
        tasks: ['compass:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-jsdoc-ng');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', []);
};