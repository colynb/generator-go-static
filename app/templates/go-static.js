var fs = require('fs'),
	YAML = require('yamljs'),
	moment = require('moment'),
	iniparser = require('iniparser');

function pad(n){
	return n<10 ? '0'+n : n
}

module.exports = {
	site: {
		title: '<%= props.siteName %>',
		description: '<%= props.siteDescription %>',
		author: {
			name: '<%= props.siteAuthor %>',
			email: '<%= props.siteAuthorEmail %>'
  		}
	},
	paths: {
		source : '<%= props.srcPath %>',
		output : '<%= props.outPath %>',
		tmp : '<%= props.tmpPath %>',
	},
	format: {
		postDatePath: 'YYYY/MM/DD',
		date: null, // <--- default formatting for moment.js
	},
	validExts : ['md'],
	getPostPrefix:
	generateDocMeta: function(meta) {
		var content = '----\n';
		content += YAML.stringify(meta, 4);
		content += '----\n\n'
		return content;
	}
}