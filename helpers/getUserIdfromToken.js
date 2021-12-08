require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = function getUserIdFromToken(token) {
    const decodedToken = jwt.verify(token, process.env.TOKENSECRET) // decodage du token
    const userId = decodedToken.userId   // recup de l'id
    return userId
}


