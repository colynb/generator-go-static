var fs = require('fs'),
	YAML = require('yamljs'),
	iniparser = require('iniparser'),
	chalk = require('chalk');

function getUserHome() {
	return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var GoStatic = module.exports = {
	paths: {
		source: './src',
		output: './out',
		tmp: './.tmp'
	},
	editor: {
		indentStyle: 'tab'
	},
	format: {
		postDatePath: 'YYYY/MM/DD',
		date: null, // <--- default formatting for moment.js
	},
	banner: 
'\n     _-----_' +
'\n    |       |' +
'\n    |' + chalk.red('--(o)--') + '|   .----------------------.' +
'\n   `---------´  |      ' + chalk.yellow.bold('Welcome to') + '      |' +
'\n    ' + chalk.yellow('(') + ' _' + chalk.yellow('´U`') + '_ ' + chalk.yellow(')') + '   |   ' + chalk.yellow.bold('Yeoman Go-Static!') + '  |' +
'\n    /___A___\\   \'----------------------\'' +
'\n     ' + chalk.yellow('|  ~  |') +
'\n   __' + chalk.yellow('\'.___.\'') + '__' +
'\n ´   ' + chalk.red('`  |') + '° ' + chalk.red('´ Y') + ' `\n',
	getGitConfig: function() {
		if (!fs.existsSync(getUserHome() + '/.gitconfig')) return null;
		return iniparser.parseSync(getUserHome() + '/.gitconfig');
	},
	initDirs: function (){
		return [
			this.paths.source + '/docs/posts',
			this.paths.source + '/layouts',
			this.paths.source + '/partials',
			this.paths.source + '/assets/css/',
			this.paths.source + '/assets/js/',
			this.paths.source + '/assets/img/'
		]
	},
	initCopy: function (){
		return [
			{src: 'Gruntfile.js', dst: 'Gruntfile.js'},
			{src: 'header.html', dst: this.paths.source + '/partials/header.html'},
			{src: 'footer.html', dst: this.paths.source + '/partials/footer.html'},
			{src: 'layouts/base.html', dst: this.paths.source + '/layouts/base.html'},
			{src: 'layouts/home.html', dst: this.paths.source + '/layouts/home.html'},
			{src: 'layouts/post.html', dst: this.paths.source + '/layouts/post.html'},
			{src: 'layouts/page.html', dst: this.paths.source + '/layouts/page.html'},
		]
	},
	initTpl: function (){
		return [
			{src: 'go-static.js', dst: 'go-static.js'},
			{src: '_package.json', dst: 'package.json'},
		]
	},
	generateDocMeta: function(meta) {
		var content = '----\n';
		content += YAML.stringify(meta, 4);
		content += '----\n\n'
		return content;
	}
};