const Roles = require('./roles');

module.exports = {
    username: String,
    passwordHash: String,
    salt: String,
    role: Roles,
}