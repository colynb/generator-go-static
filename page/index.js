'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var GoStatic = require('../lib');
var goStaticConfig = require( process.cwd() + '/go-static' );
var moment = require('moment');
var chalk = require('chalk');

var PageGenerator = module.exports = function PageGenerator(args, options, config) {

  this.on('end', function () {
  });
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(PageGenerator, yeoman.generators.NamedBase);

PageGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var gitConfig = GoStatic.getGitConfig();
  var siteAuthor = (gitConfig) ? gitConfig.user.name : '';
  var siteAuthorEmail = (gitConfig) ? gitConfig.user.email : '';

  var prompts = [
    {
      name: 'pageTitle',
      message: 'Page title?'
    }
  ];

  this.prompt(prompts, function (props) {
    this.props = props;

    cb();
  }.bind(this));
};

PageGenerator.prototype.files = function files() {
  var today = moment();
  var filename = this._.slugify(this.props.pageTitle) + '.md';

  var meta = {
    layout: 'page',
    title: this.props.pageTitle,
    path: '/' + filename.replace(/\.md$/, '.html'),
    type: 'page',
    created: today.format(goStaticConfig.format.date),
  };

  
  var content = GoStatic.generateFrontMatter(meta);
  this.write(goStaticConfig.paths.source + '/docs/' + filename, content);

  console.log(chalk.red('\nNew page generated!'));
  Object.keys(meta).forEach(function(key){
    console.log(chalk.green('   ' + key + ': ') + JSON.stringify(meta[key]));
  });
  console.log('');

};
