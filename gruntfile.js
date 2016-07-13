module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['gruntfile.js', 'index.js', 'tests/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        browserify: {
            'dist/app.js': ['index.js']
        },
        clean: ['dist'],
        'http-server': {
            'dev': {
                port: 8282,
                host: "0.0.0.0",

                // Tell grunt task to open the browser
                openBrowser : true
            }
        },

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/css/creative.css": "less/creative.less" // destination file and source file
                }
            }
        }
    });

    //Tasks
    grunt.registerTask('dist', ['jshint', 'less', 'browserify']); //Generates build folder
    grunt.registerTask('serve', ['http-server']);

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-http-server');
};
