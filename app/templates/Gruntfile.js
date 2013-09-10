'use strict';
var moment = require('moment');
var marked = require('marked');
var swig = require('swig');
 
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

var goStatic = require('./go-static');

var Backbone = require('backbone');
var _ = require('lodash');

var Doc = Backbone.Model.extend({
  defaults: {
	layout: 'main',
	type: 'post'
  }
});

var DocCollection = Backbone.Collection.extend({
	model: Doc,
	sortAttribute: "created-date",
	sortDirection: -1,
	getPosts: function () {
		this.sortAttribute = 'created';
		this.sortDirection = -1;
		this.sort();
		return this.where({type:'post'});
	},
	getPages: function () {
		this.sortAttribute = 'created';
		this.sortDirection = 1;
		this.sort();
		return this.where({type:'page'});
	},
	comparator: function(a, b) {
	  var a = a.get(this.sortAttribute),
		  b = b.get(this.sortAttribute);
 
	  if (a == b) return 0;
 
	  if (this.sortDirection == 1) {
		 return a > b ? 1 : -1;
	  } else {
		 return a < b ? 1 : -1;
	  }
   }
});

var docLibrary = new DocCollection;
 
module.exports = function (grunt) {
	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
	grunt.initConfig({
		watch: {
			options: {
				nospawn: true,
				livereload: LIVERELOAD_PORT
			},
			livereload: {
				files: [
					goStatic.paths.source + '/docs/**/*.md'
				],
				tasks: ['build']
			}
		},
		connect: {
			options: {
				port: 9000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, goStatic.paths.output)
						];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		}
	});
 
	grunt.registerTask('server', ['connect:livereload', 'build', 'open', 'watch']);
	grunt.registerTask('build', 'Build your blog!', function () {
		docLibrary.reset();
		grunt.file.recurse(goStatic.paths.source + '/docs', function (path, root, sub, fileName) {
			var contents = grunt.file.read(path);
			var doc = goStatic.getDocData(contents);
			doc.src = path;
			doc.filename = fileName;
			docLibrary.add(doc);
		});

		var posts = docLibrary.getPosts();
		var pages = docLibrary.getPages();

		docLibrary.each(function(doc){
			var content = goStatic.generateSwigTemplate(doc);
			grunt.file.write(goStatic.paths.tmp + '/' + doc.get('filename'), content);
			var tpl = swig.compileFile(goStatic.paths.tmp + '/' + doc.get('filename'));
			var vars = doc.attributes;
			vars.site = goStatic.site;
			vars.posts = posts;
			vars.pages = pages;
			content = tpl(vars);
			console.log(doc.attributes);
			grunt.file.write(goStatic.paths.output + doc.get('path'), content);
			grunt.log.ok('Created ' + goStatic.paths.output + doc.get('path'));
		});
		grunt.file.recurse(goStatic.paths.source + '/assets/', function(path, root, sub, fileName) {
			var dest = goStatic.paths.output + '/' + path.split('/').slice(2).join('/');
			grunt.file.copy(path, dest);
		});
	});
 
};