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
        copy: [
            { expand: true, flatten: true, src: ['html/index.html'], dest: 'build/' },
            { expand: true, flatten: true, src: ['lib/*'], dest: 'build/lib/' },
            { expand: true, flatten: true, src: ['css/*'], dest: 'build/css/' }
        ],
        simplemocha: {
            options: {
                globals: ['expect'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'tap'
            },
            all: { src: ['tests/*.js'] }
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
    grunt.registerTask('dist', ['jshint', 'simplemocha', 'less', 'browserify']); //Generates build folder
    
    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-less');
};
