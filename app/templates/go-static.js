var YAML = require('yamljs');
var swig = require('swig');
var marked = require('marked');
var fs = require('fs');

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
	getDocData: function(contents) {
		var prep = contents.split('----');
		var data = YAML.parse(prep[1]);
		data.content = prep[2];
		return data;
	},
	generateSwigTemplate: function(doc) {
		var layout = '../' + this.paths.source + '/layouts/' + doc.get('layout') + '.html';
		var content = '{% extends \''+layout+'\' %}';
		content += '\n\n' + '{% block title %}{{ title }} | {% parent %}{% endblock %}';
		content += '\n\n' + '{% block '+doc.get('type')+' %}';
		content += '\n\n\t' + marked(doc.get('content'));
		content += '\n\n' + '{% endblock %}';
		return content;
	}
}