'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var GoStatic = require('../lib');
var goStaticConfig = require( process.cwd() + '/go-static' );
var moment = require('moment');
var chalk = require('chalk');

var TagGenerator = module.exports = function TagGenerator(args, options, config) {
  // By calling `NamedBase` here, we get the argument to the subgenerator call
  // as `this.name`.
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(TagGenerator, yeoman.generators.NamedBase);

TagGenerator.prototype.files = function files() {
  this.copy('somefile.js', 'somefile.js');
};

TagGenerator.prototype.files = function files() {
  var today = moment();
  var filename = this._.slugify(this.name) + '.html';

  this.props = {
  	title: this.name,
  	path: '/tags/' + filename,
  	created: today.format(goStaticConfig.format.date)
  }

  this.template('template.html', goStaticConfig.paths.source + '/docs/tags/' + filename);

  console.log(chalk.red('\nNew tag page generated!'));
};
