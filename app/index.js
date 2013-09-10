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
	console.log(this.yeoman);

	var gitConfig = GoStatic.getGitConfig();
	var siteAuthor = (gitConfig) ? gitConfig.user.name : '';
	var siteAuthorEmail = (gitConfig) ? gitConfig.user.email : '';

	var prompts = [
		{
			name: 'siteName',
			message: 'What is the name of your website?'
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

	GoStatic.initPaths().forEach(function(path){
		yo.mkdir(path);
	});

	this.template('Gruntfile.js', 'Gruntfile.js');
	this.template('go-static.js', 'go-static.js');

	this.template('_package.json', 'package.json');
};

GoStaticGenerator.prototype.projectfiles = function projectfiles() {
	this.template('_editorconfig', '.editorconfig');
	this.template('_bowerrc', '.bowerrc');
	this.template('_gitignore', '.gitignore');
};
