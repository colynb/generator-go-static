'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var GoStatic = require('./go-static-generator');

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
			default: 'Front-End Development Blog'
		},
		{
			name: 'siteDescription',
			message: 'Description?',
			default: 'My amazing blog, powered by the Go-Static Yeoman generator!'
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

	GoStatic.initDirs().forEach(function(path){
		yo.mkdir(path);
	});

	GoStatic.initCopy().forEach(function(path){
		yo.copy(path.src, path.dst);
	});

	GoStatic.initTpl().forEach(function(path){
		yo.template(path.src, path.dst);
	});
};

GoStaticGenerator.prototype.projectfiles = function projectfiles() {
	this.template('_editorconfig', '.editorconfig');
	this.template('_bowerrc', '.bowerrc');
	this.template('_gitignore', '.gitignore');
};
