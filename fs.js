// This module implements the js-git fs interface for HTML5 FS
// The interface is documented at:
//
//   https://github.com/creationix/js-git/blob/master/specs/fs.md
//

module.exports = exports = chroot;
exports.stat = stat;
exports.read = read;
exports.write = write;
exports.readStream = readStream;
exports.writeStream = writeStream;
exports.unlink = unlink;
exports.readlink = readlink;
exports.symlink = symlink;
exports.readdir = readdir;
exports.rmdir = rmdir;
exports.mkdir = mkdir;
exports.rename = rename;

function getFS(callback) {
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(window.PERSISTENT, Math.pow(2, 30) /* 1GB */, 
    function(fileSystem) {
        callback(null, fileSystem);
    }, 
    function (fileError) {
        callback(fileError, null);
    });
}

function chroot(root) {
  
}

// Given a path, return a continuable for the stat object.
function stat(path, callback) {
  
}

function read(path, encoding, callback) {
  
}

function write(path, value, encoding, callback) {
  
}

// Given a path and options return a stream source of the file.
// options.start the start offset in bytes
// options.end the offset of the last byte to read
// readStream(path, options) -> continuable<stream>
function readStream(path, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = null;
  }
  if (!callback) return readStream.bind(this, path, options);
  
  var file, emit;
  
  getFS().root.getFile(path, {}, function (fileEntry) {    
    file = fileEntry;
    callback(null, { read: fileRead, abort: fileAbort });
  }, errorHandler);
  
  function fileRead(readCallback) {
      if (!fd) return readCallback();
      if (emit) return readCallback(new Error("Only one read at a time"));
      emit = callback;
  }
  
  function fileAbort(callback) {
    file = null;
    callback();
  }
  
  function errorHandler(error) {
      console.log("FS Error:"+error);
      callback(error);
  }
}

function writeStream(path, options, callback) {
  
}

function unlink(path, callback) {
  
}

function readlink(path, callback) {
  
}

function symlink(path, value, callback) {
  
}

function readdir(path, callback) {
  
}

function rmdir(path, callback) {
  
}

function mkdir(path, callback) {
 
}

function rename(source, target, callback) {
  
}