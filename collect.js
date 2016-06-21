var fs = require('fs');
var path = require('path');

module.exports = function collect(dir, collection) {

  return {
    name: collection,
    type: 'folder',
    path: collection,
    items: walkthru(dir, collection)
  };
};

function walkthru(dir, prefix){

  prefix = prefix || '';

  if(!fs.existsSync(dir)){
    return [];
  }

  return fs.readdirSync(dir).filter(function(f) {

    // return f && f[0] != '.';
    return f.substr(-4) === '.mp3';

  }).map(function(f) {
    var p = path.join(dir, f),
      stats = fs.statSync(p);

    if(stats.isDirectory()) {
      return {
        name: f,
        type: 'folder',
        path: path.join(prefix, p),
        items: walkthru(p, prefix)
      };
    }

    return {
      name: f,
      type: 'file',
      path: path.join(prefix, p),
      size: stats.size
    }
  });

};
