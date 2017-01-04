module.exports = function(grunt) {

    grunt.initConfig({
        less: {
            production: {
                options: {
                    cleancss: false,
                },
                files: {
                    "./css/style.css": "./css/style.less"
                }
            }
        },
        watch: {
            underscore: {
                files: [
                    './_templates/*.us'
                ],
                tasks: ['pageTemplates'],
                options: {
                    debounceDelay: 100
                },
            },
            less: {
                files: [
                    './**/*.less'
                ],
                tasks: ['less'],
                options: {
                    debounceDelay: 100
                },
            }
        },
        pageTemplates: {
            production: {
                folder: "./_templates/",
                dest: "./"
            }
        }
    });

    grunt.registerTask('pageTemplates', 'Generate pages from templates', function() {

        var options = grunt.config('pageTemplates')["production"];


        //list template files
        var fs = require('fs');
        var files = fs.readdirSync(options.folder);

        var libFile = require('./lib.js');

        for (var i in files) {
            var file = files[i];

            if (file.indexOf("_") !== 0) { //don't render includes

                var parts = file.split('.')
                var ext = (parts.length > 1 ? parts.pop() : null)
                var outputFileName = parts.join('.');

                if (ext === 'us') {
                    console.log(' ... ' + file);

                    libFile.underscoreTemplate(options.folder + file, options.dest + outputFileName + ".html", {});
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['pageTemplates', 'less']);
}
