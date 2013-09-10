var YAML = require('yamljs');
var swig = require('swig');
var marked = require('marked');
var fs = require('fs');
var crypto = require('crypto');

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
	getDocData: function(contents) {
		var prep = contents.split('----');
		var data = YAML.parse(prep[1]);
		data.content = prep[2].trim();
		return data;
	},
	generateSwigTemplate: function(doc) {
		var layout = '../' + this.paths.source + '/layouts/' + doc.get('layout') + '.html';
		var content = '{% extends \''+layout+'\' %}';
		content += '\n\n' + '{% block title %}{{ doc.title }} | {% parent %}{% endblock %}';
		content += '\n\n' + '{% block content %}';
		content += '\n\n\t' + doc.get('content');
		content += '\n\n' + '{% endblock %}';
		return content;
	},
	generateGravatar: function (email) {
		return 'http://www.gravatar.com/avatar/' + crypto.createHash('md5').update(email).digest("hex");
	}
}