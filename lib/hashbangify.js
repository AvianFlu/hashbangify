var fs = require('fs'),
    childProcess = require('child_process');

var hashbangify = exports.hashbangify = function (oldfile, newfile) {
  getNodePath();

  function getNodePath() {
    childProcess.exec('which node', function (err, stdout) {
      if (err) {
        console.error(err.stack);
        console.error('Could not obtain node location: exiting.');
        return;
      }
      addHashBang(stdout);
    });
  }

  function addHashBang(path) { 
    var writeStream = fs.createWriteStream(newfile),
        readStream = fs.createReadStream(oldfile);
    path = '#!' + path;  
    writeStream.write(path + '\n');
    readStream.pipe(writeStream);
  }

  process.on('exit', function () {
    fs.chmodSync(newfile, 0755);
  });

}




