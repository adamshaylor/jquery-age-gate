module.exports = function (grunt) {


  var config = {};


  config.connect = {
    server: {}
  };


  config.jshint = {
    ageGate: ['jquery-age-gate.js'],
    options: {
      reporter: require('jshint-stylish')
    }
  };


  config.uglify = {
    ageGate: {
      options: {
        sourceMap: true
      },
      files: {
        'jquery-age-gate.min.js': ['jquery-age-gate.js'],
        'cookie-adapters/adapter-cookies.min.js': ['cookie-adapters/adapter-cookies.js'],
        'cookie-adapters/adapter-jquery-cookie.min.js': ['cookie-adapters/adapter-jquery-cookie.js']
      }
    }
  };


  config.watch = {
    ageGate: {
      files: ['jquery-age-gate.js', 'cookie-adapters/*'],
      tasks: ['default']
    }
  };


  config.notify_hooks = {
    options: {
      success: true
    }
  };


  grunt.initConfig(config);


  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-notify');


  grunt.registerTask('default', ['jshint', 'uglify']);
  grunt.registerTask('dev', ['default', 'connect', 'watch']);


  grunt.task.run('notify_hooks');


};
