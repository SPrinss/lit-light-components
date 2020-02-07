const stylesheetInliner = require('stylesheet-inliner');
const argv = require('minimist')(process.argv.slice(2));
var fs = require('fs');
var path = require('path');
const MagicString = require('magic-string');

function inlineStyles(curPath, replaceFolder, basePath) {

  if ( fs.lstatSync( curPath ).isDirectory() ) {
    const files = fs.readdirSync( curPath );
    files.forEach( function ( file ) {
        var curSource = path.join( curPath, file );
        if ( fs.lstatSync( curSource ).isDirectory() ) {
          inlineStyles( curSource, replaceFolder, basePath  );
        } else {
          _inlineStylesOfFile(curSource, replaceFolder, basePath);
        }
    } );
  } else {
    _inlineStylesOfFile(curPath, replaceFolder, basePath);
  } 

}

function _inlineStylesOfFile(filePath, replaceFolder, replaceWithFolder) {
  const code = fs.readFileSync( filePath ).toString();
  const magicString = new MagicString(code.replace(/<link.*?rel="stylesheet".*?>/gi, (match) => {
    if(replaceFolder) match = match.replace(replaceFolder, replaceWithFolder)
    return stylesheetInliner(match, '/');
  }));
  fs.writeFileSync(filePath, magicString.toString())
}

inlineStyles(argv.dir, argv.replaceFolder, argv.dir)