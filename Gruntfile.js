'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Configurable paths
    var config = {
        source: '',
        scss: 'sass',
        css: 'css',
        bowerComponents: 'bower_components'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {           
            sass: {
                files: ['<%= config.scss %>/{,*/}*.{scss,sass}'],
                tasks: ['sass:server'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },

      
        // Compiles Sass to CSS and generate necessary files if requested
        sass: {
            options: {
                precision: 8,
                loadPath: '<%= config.bowerComponents %>'
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.scss %>',
                    src: ['**/*.{scss,sass}'],
                    dest: '<%= config.css %>',
                    ext: '.css'
                }]
            }
        }

    });


    grunt.registerTask('server', 'start the server and preview your app', function () {
        grunt.task.run([
            'sass:server',
            'watch'
        ]);
    });


};