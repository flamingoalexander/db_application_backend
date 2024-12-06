const crypto = require('crypto');

function generateRandomString() {
    return crypto.createHash('sha256')
        .update(crypto.randomBytes(64))
        .digest('hex')
        .slice(0, 64);
}

module.exports = { generateRandomString };
