'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var goStatic = require(process.cwd() + '/go-static');

var PostGenerator = module.exports = function PostGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('You called the post subgenerator with the argument ' + this.name + '.');
};

util.inherits(PostGenerator, yeoman.generators.NamedBase);

PostGenerator.prototype.files = function files() {
	var today = new Date();
	var prefix = today.getFullYear();
	prefix += '/' + (today.getUTCMonth() + 1);
	prefix += '/' + today.getDate();
	var filename = prefix + '/' + this._.slugify(this.name) + '.md';

	var meta = {
		layout: 'main',
		path: '/posts/' + filename.replace(/\.md$/, '.html'),
		created: new Date(),
		author: goStatic.site.author
	};

	var content = goStatic.generateDocMeta(meta);
	content += '# ' + this.name;
	console.log(goStatic.paths.source + '/docs/posts/' + filename);
	//this.write(goStatic.paths.source + '/docs/posts/' + filename, content);
};
