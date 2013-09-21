var fs = require('fs'),
  YAML = require('yamljs'),
  iniparser = require('iniparser'),
  chalk = require('chalk');

function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

var GoStatic = {
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
  sourceFolders: function (){
    return [
      {src: 'starter', dst: this.paths.source}
    ]
  },
  templates: function (){
    return [
      {src: 'starter/docs/posts/welcome.md', dst: this.source + '/docs/posts/welcome.md'},
      {src: '_goStaticConfig.js', dst: 'go-static.js'},
      {src: '_package.json', dst: 'package.json'},
      {src: '_gruntfile.js', dst: 'Gruntfile.js'}
    ]
  },
  generateFrontMatter: function(meta) {
    var content = '---\n';
    content += YAML.stringify(meta, 4);
    content += '---\n\n'
    return content;
  }
};

module.exports = GoStatic;