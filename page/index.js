'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var GoStatic = require('../app/go-static-generator');
var goStaticConfig = require(process.cwd() + '/go-static');
var moment = require('moment');

var PageGenerator = module.exports = function PageGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);

  console.log('Generating new page... "' + this.name + '".');
};

util.inherits(PageGenerator, yeoman.generators.NamedBase);

PageGenerator.prototype.files = function files() {
  var today = moment();
  var filename = this._.slugify(this.name) + '.md';

  var meta = {
    layout: 'page',
    title: this.name,
    path: '/' + filename.replace(/\.md$/, '.html'),
    type: 'page',
    created: today.format(goStaticConfig.format.date),
    author: goStaticConfig.site.author
  };

  var content = GoStatic.generateDocMeta(meta);
  content += '# ' + this.name;
  this.write(goStaticConfig.paths.source + '/docs/' + filename, content);
};
