var fs = require('fs'),
    childProcess = require('child_process');

var hashbangify = exports.hashbangify = function (file, interpreter) {
  getNodePath();

  var path = '';

  function getNodePath() {
    childProcess.exec('which ' + interpreter, function (err, stdout) {
      if (err) {
        console.error(err.stack);
        console.error('Could not obtain interpreter location: exiting.');
        process.exit(1);
      }
      hashBang = '#!' + stdout;
      fs.readFile(file, gotScript);
    });
  }

  function gotScript(err, data) {
    fs.unlink(file, function (err) {
      if(err) {
        console.error(err.stack);
        process.exit(1);
      }
      addHashBang(file, data);
    });
  }

  function addHashBang(file, data) { 
    var writeStream = fs.createWriteStream(file);
    writeStream.write(hashBang + '\n');
    writeStream.end(data);
  }

  process.on('exit', function () {
    fs.chmodSync(file, 0755);
  });

}




