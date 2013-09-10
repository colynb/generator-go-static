'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var GoStaticMain = require('../app/go-static-generator');
var goStatic = require(process.cwd() + '/go-static');
var moment = require('moment');

var PostGenerator = module.exports = function PostGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Generating new post... "' + this.name + '".');
};

util.inherits(PostGenerator, yeoman.generators.NamedBase);

PostGenerator.prototype.files = function files() {
	var today = moment();
	var prefix = today.format(goStatic.format.postDatePath);
	var filename = prefix + '/' + this._.slugify(this.name) + '.md';

	var meta = {
		layout: 'post',
    	title: this.name,
		path: '/posts/' + filename.replace(/\.md$/, '.html'),
		type: 'post',
		created: today.format(goStatic.format.date),
		author: goStatic.site.author
	};

	var content = GoStaticMain.generateDocMeta(meta);
	content += '# ' + this.name;
	this.write(goStatic.paths.source + '/docs/posts/' + filename, content);
};
