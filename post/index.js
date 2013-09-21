'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var GoStatic = require('../lib');
var goStaticConfig = require( process.cwd() + '/go-static' );
var moment = require('moment');
var chalk = require('chalk');

var PostGenerator = module.exports = function PostGenerator(args, options, config) {

  this.on('end', function () {
  });
  yeoman.generators.Base.apply(this, arguments);

};

util.inherits(PostGenerator, yeoman.generators.NamedBase);

PostGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var gitConfig = GoStatic.getGitConfig();
  var siteAuthor = (gitConfig) ? gitConfig.user.name : '';
  var siteAuthorEmail = (gitConfig) ? gitConfig.user.email : '';

  var prompts = [
    {
      name: 'postTitle',
      message: 'Post title?'
    },
    {
      name: 'postSnippet',
      message: 'Snippet?'
    },
    {
      name: 'postTags',
      message: 'Tags?'
    },
    {
      name: 'postAuthor',
      message: 'Author?',
      default: siteAuthor
    },
    {
      name: 'postAuthorEmail',
      message: 'Author Email?',
      default: siteAuthorEmail
    }
  ];

  this.prompt(prompts, function (props) {
    this.props = props;

    cb();
  }.bind(this));
};

PostGenerator.prototype.files = function files() {

  var today = moment();
  var prefix = today.format(goStaticConfig.format.postDatePath);
  var filename = prefix + '/' + this._.slugify(this.props.postTitle) + '.md';
  var tags = this.props.postTags.split(/[\s,]+/);

  var meta = {
    layout: 'post',
      title: this.props.postTitle,
      snippet: this.props.postSnippet,
      tags: tags,
    path: '/posts/' + filename.replace(/\.md$/, '.html'),
    type: 'post',
    created: today.format(goStaticConfig.format.date),
    author: { name: this.props.postAuthor, email: this.props.postAuthorEmail }
  };

  
  var content = GoStatic.generateFrontMatter(meta);
  this.write(goStaticConfig.paths.source + '/docs/posts/' + filename, content);

  console.log(chalk.red('\nNew post generated!'));
  Object.keys(meta).forEach(function(key){
    console.log(chalk.green('   ' + key + ': ') + JSON.stringify(meta[key]));
  });
  console.log('');

};
