'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var GoStatic = require('../lib/');
var moment = require('moment');
var chalk = require('chalk');
var fs = require('fs');

var GoStaticGenerator = module.exports = function GoStaticGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(GoStaticGenerator, yeoman.generators.Base);

GoStaticGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(GoStatic.banner);

	var gitConfig = GoStatic.getGitConfig();
	var siteAuthor = (gitConfig) ? gitConfig.user.name : '';
	var siteAuthorEmail = (gitConfig) ? gitConfig.user.email : '';

	var prompts = [
		{
			name: 'siteName',
			message: 'What is the name of your website?',
			validate: function(input) {
				return (input) ? true : false;
			}
		},
		{
			name: 'siteDescription',
			message: 'Description?',
			validate: function(input) {
				return (input) ? true : false;
			}
		},
		{
			name: 'siteAuthor',
			message: 'Site Author?',
			default: siteAuthor
		},
		{
			name: 'siteAuthorEmail',
			message: 'Site Author Email?',
			default: siteAuthorEmail
		}
	];

	this.prompt(prompts, function (props) {
		this.props = props;

		cb();
	}.bind(this));
};

GoStaticGenerator.prototype.app = function app() {

	this.props.outPath = GoStatic.paths.output;
	this.props.srcPath = GoStatic.paths.source;
	this.props.tmpPath = GoStatic.paths.tmp;
	this.props.indentStyle = GoStatic.editor.indentStyle;

	var yo = this;

	GoStatic.sourceFolders().forEach(function(path){
		yo.directory(path.src, path.dst);
	});

	GoStatic.templates().forEach(function(path){
		yo.template(path.src, path.dst);
	});
};
