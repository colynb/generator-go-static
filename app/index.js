'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var GoStatic = require('./go-static-generator');
var moment = require('moment');
var chalk = require('chalk');
var fs = require('fs');

var GoStaticGenerator = module.exports = function GoStaticGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });


		/*
			Generate HomePage
		*/

		var today = moment();
		var title = 'Home';
		var filename = 'index.md.html';

		var meta = {
			layout: 'home',
			title: 'Home',
			path: '/' + filename.replace(/\.md\./, '.'),
			type: 'page',
			created: today.format(),
		};


		var content = GoStatic.generateDocMeta(meta);

		content += '' + 
'\n{% for post in posts %}' +
'\n#### [{{post.attributes.title}}]({{post.attributes.path}})' +
'\n{{ post.attributes.snippet|safe }}' + 
'\n{% endfor %}';
		
		//console.log(fs.realpathSync(process.cwd() + '/src/docs/' + filename));

		fs.writeFileSync(process.cwd() + '/src/docs/' + filename, content);

		console.log(chalk.red('\nNew page generated!'));
		Object.keys(meta).forEach(function(key){
			console.log(chalk.green('   ' + key + ': ') + JSON.stringify(meta[key]));
		});
		console.log('');

		/*
			Generate First Blog Post
		*/

		var gitConfig = GoStatic.getGitConfig();
		var siteAuthor = (gitConfig) ? gitConfig.user.name : '';
		var siteAuthorEmail = (gitConfig) ? gitConfig.user.email : '';

		filename = 'welcome.md';
		var tags = ['welcome','awesome','blog','go-static'];

		var meta = {
			layout: 'post',
	    	title: 'First Post',
	    	snippet: 'An initial post automatically generated by Go-Static!',
	    	tags: tags,
			path: '/posts/' + filename.replace(/\.md$/, '.html'),
			type: 'post',
			created: today.format(GoStatic.format.date),
			author: { name: siteAuthor, email: siteAuthorEmail }
		};

		
		content = GoStatic.generateDocMeta(meta);

		content += '### Hey there! This is post was automatically generated for you!';

		fs.writeFileSync(process.cwd() + '/src/docs/posts/' + filename, content);

		console.log(chalk.red('\nNew post generated!'));
		Object.keys(meta).forEach(function(key){
			console.log(chalk.green('   ' + key + ': ') + JSON.stringify(meta[key]));
		});
		console.log('');

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
