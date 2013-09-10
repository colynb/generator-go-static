var fs = require('fs'),
	YAML = require('yamljs'),
	iniparser = require('iniparser');

function getUserHome() {
	return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var GoStatic = module.exports = {
	paths: {
		source: './src',
		output: './out'
	},
	editor: {
		indentStyle: 'tab'
	},
	getGitConfig: function() {
		if (!fs.existsSync(getUserHome() + '/.gitconfig')) return null;
		return iniparser.parseSync(getUserHome() + '/.gitconfig');
	},
	initPaths: function (){
		return [
			this.paths.source + '/docs/posts',
			this.paths.output + '/css/',
			this.paths.output + '/js/',
			this.paths.output + '/img/'
		]
	},
	generateDocMeta: function(meta) {
		var content = '----\n';
		content += YAML.stringify(meta, 4);
		content += '----\n\n'
		return content;
	}
};