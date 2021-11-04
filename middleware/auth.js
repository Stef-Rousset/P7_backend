const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //recup du token ds les headers
        const decodedToken = jwt.verify(token, process.env.TOKENSECRET); // decodage du token
        const userId = decodedToken.userId;    // recup de l'id
        if (req.body.userId && req.body.userId !== userId) { // l'id extrait du token ne match pas celui de la req
            return res.status(403).json({error: 'Unauthorized request'})
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
