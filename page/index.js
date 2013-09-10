'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var goStatic = require(process.cwd() + '/go-static');

var PageGenerator = module.exports = function PageGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
  console.log('You called the page subgenerator with the argument ' + this.name + '.');
};

util.inherits(PageGenerator, yeoman.generators.NamedBase);

PageGenerator.prototype.files = function files() {
	
  var filename = this._.slugify(this.name) + '.md';
  var content = '---\n';
  content += 'layout: page\n';
  content += 'path: /' + filename.replace(/\.md$/, '.html') + '\n';
  content += '---\n\n';
  content += '# ' + this.name;
  this.write(goStatic.paths.source + '/docs/' + filename, content);

};
