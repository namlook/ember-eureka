module.exports = function(grunt) {

    require('jit-grunt')(grunt);
    grunt.initConfig({
        // watch files
        watch: {
            'default': {
                files: ['templates/**/*'],
                tasks: ['build']
            }
        },

        // build templates into dist/templates.js
        emberTemplates: {
            'default': {
                options: {
                    templateRegistration: function(name, content) {
                        name = name.split('/').slice(-1)[0].replace('.', '/');
                        return 'Ember.TEMPLATES["' + name + '"] = ' + content;
                    }
                },
                files: {
                    "./dist/templates.js": ["templates/**/*.hbs", "app/frontend/templates/**/*.handlebars"]
                }
            }
        },

    });

    grunt.registerTask('build', ['emberTemplates']);
};