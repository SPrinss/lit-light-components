var fs = require('fs');
var path = require('path');
const argv = require('minimist')(process.argv.slice(2));

function removeStyleFiles(basePath) {

  if ( fs.lstatSync( basePath ).isDirectory() ) {
    const files = fs.readdirSync( basePath );
    files.forEach( function ( file ) {
        var curSource = path.join( basePath, file );
        if ( fs.lstatSync( curSource ).isDirectory() ) {
          removeStyleFiles( curSource );
        } else {
          _removeStyleFile(curSource);
        }
    } );
  } else {
    _removeStyleFile(basePath);
  } 

}

function _removeStyleFile(filePath) {  
  if(!!filePath.match(/.*.(.css|.styl)$/)) {
    fs.unlinkSync(filePath);
  }
}

removeStyleFiles(argv.dir)