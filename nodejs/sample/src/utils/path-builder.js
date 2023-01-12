const path = require('path'); 

module.exports.fromRoot = (toPath) => {
    return path.join(path.resolve(), toPath);
}

module.exports.fromApp = (toPath) => {
    return path.join(path.resolve(), 'src', toPath);
}