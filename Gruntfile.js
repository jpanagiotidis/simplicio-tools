'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      sassAssets: ['sass/'],
      cssAssets: ['']
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: true
        },
        files: {
          '<%= project.cssAssets %>simplicio-tools.css':'<%= project.sassAssets %>simplicio-tools.scss'
        }
      }
    },
    watch: {
      sass: {
        files: '<%= project.sassAssets %>{,*/}*.{scss,sass}',
        tasks: ['sass:dev']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', 
    [
      'watch'
    ]);
};