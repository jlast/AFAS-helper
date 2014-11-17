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
		
		uglify: {
			my_target: {
				files: {
					'build/js/default.js': ['js/libs/jquery-1.4.4.min.js', 'js/libs/jquery-ui-1.8.11.custom.min.js', 'js/libs/date.js', 'js/jquery.weekcalendar.js', 'js/functions.js', 'js/configuration.js', 'js/calendar.js', 'js/init.js'], 
					'build/js/default-popup.js': ['js/libs/jquery-1.4.4.min.js', 'js/libs/jquery-ui-1.8.11.custom.min.js', 'js/jquery.weekcalendar.js', 'js/functions.js', 'js/calendar.js', 'js/popup.js']
				}
			}
		},
		processhtml: {
			options: {
				data: {
					message: 'Hello world!'
				}
			},
			dist: {
				files: {
					'build/index.html': ['index.html'],
					'build/popup.html': ['popup.html']
				}
			}
		},
		copy: {
			main: {
				files: [
					{src: ['afas-helper.png'], dest: 'build/afas-helper.png'},
					{src: ['manifest.json'], dest: 'build/manifest.json'},
					{expand: true, src: ['css/**'], dest: 'build/'},

					// includes files within path and its sub-directories
					{expand: true, src: ['path/**'], dest: 'dest/'},

					// makes all src relative to cwd
					{expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

					// flattens results to a single level
					{expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},
				],
			},
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
        },
		remove: {
			build: {
				dirList: ['build']
			},
			exclude: {
				fileList: ['build/css/style.css.map'],
			}
		},

    });


    grunt.registerTask('server', 'start the server and preview your app', function () {
        grunt.task.run([
            'sass:server',
            'watch'
        ]);
    });

    grunt.registerTask('build', 'compress the javascript and css', function () {
        grunt.task.run([
			'remove:build',
            'uglify',
			'processhtml',
			'copy',
			'remove:exclude'
        ]);
    });


};