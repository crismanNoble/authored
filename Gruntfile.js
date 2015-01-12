module.exports = function(grunt) {

	var _ = require('lodash');

	require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});

	grunt.initConfig({

		less : {
			development: {
				options: {
					//paths: ["assets/css"]
				},
				files: {
					"dist/css/style.css": "src/less/style.less"
				}
			}
		},

		'compile-handlebars': {
			posts: {
	      template: 'src/templates/posts.handlebars',
	      templateData: 'src/data/posts.json',
	      output: 'dist/posts.html',
	      partials: ['src/templates/partials/*.handlebars']
	    }
		},

	  watch: {

		  styles: {
		  	files: 'src/less/*.less',
		  	tasks: ['buildCSS']
		  },
		  templates: {
		  	files: 'src/templates/**/*.*',
		  	tasks: ['buildHTML']
		  },
		  partials: {
		  	files: 'src/templates/partials/*.handlebars',
		  	tasks: ['buildHTML']
		  },
		  data: {
		  	files: 'src/data/*.js',
		  	tasks: ['buildHTML']
		  },
		  allTheThings: {
		  	files: 'src/**/*.js',
		  	tasks: ['buildDev']
		  }
		}
	});

	grunt.registerTask('buildCSS',['less:development']);
	grunt.registerTask('buildHTML',['compile-handlebars']);
	grunt.registerTask('buildDev',['buildCSS','buildHTML']);

	grunt.registerTask('watchThings',['watch:styles','watch:templates','watch:partials','watch:data']);

	grunt.registerTask('default', ['buildDev']);

};