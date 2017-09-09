var existsFile = require('exists-file')
var path = require('path');
var fs = require('fs')

var p = path.resolve(__dirname, '../key');
var k;

var writeKey = function (k) {
  fs.writeFileSync(p, k);
};

module.exports = function (length) {
  if (existsFile.sync(p) && typeof k == 'undefined') {
    k = fs.readFileSync(p);
  }
  if (typeof k == 'undefined') {
    k = -1;
  }
  if ((k+1) == length) {
    k = -1;
  }
  k++;
  writeKey(k);
  return k;
}
