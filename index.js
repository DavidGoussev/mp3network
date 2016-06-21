#!/usr/bin/env node

var path = require('path');
var express = require('express');
var contentDisposition = require('content-disposition');
var pkg = require(path.join(__dirname, 'package.json'));
var collect = require('./collect');
var program = require('commander');

program
    .version(pkg.version)
    .option('-p, --port <port>', 'localhost port to listen on for files (default is 3000)', parseInt)
    .parse(process.argv);

var port = program.port || 3000;
var tree = collect('.', 'files');
var app = express();

app.use('/', express.static(path.join(__dirname, 'view')));

app.use('/files', express.static(process.cwd(), {
    index: false,
    setHeaders: function(res, path){
      res.setHeader('Content-Disposition', contentDisposition(path, "inline"))
    }
}));

app.get('/collect', function(req,res){
  res.send(tree);
});

app.listen(port);

console.log('up and running with your mp3network on ' + port);
