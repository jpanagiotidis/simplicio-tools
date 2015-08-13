'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      srcAssets: ['src/'],
      srcJs: ['<%= project.srcAssets %>js'],
      srcSass: ['<%= project.srcAssets %>sass'],
      srcCss: ['<%= project.srcAssets %>css'],
      minAssets: ['min/'],
      cssAssets: ['']
    },
    compass: {
      dev: {
        options: {
          sassDir: '<%= project.srcSass %>',
          cssDir: '<%= project.srcCss %>'
        }
      }
    },
    // jsdoc : {
    //   dist : {
    //     src: ['src/*.js'],
    //     options: {
    //       destination: 'doc'
    //     }
    //   }
    // },
    watch: {
      compass: {
        files: '<%= project.srcSass %>{,*/}*.{scss,sass}',
        tasks: ['compass:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', []);
};