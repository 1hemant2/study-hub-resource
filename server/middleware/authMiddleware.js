const jwt = require('jsonwebtoken');

const autmiddleware = (req, res, next) => {
    try {
        const token = req.header("authentication").split(" ")[1];
        const decryptToken = jwt.verify(token, process.env.SECRET_TOKEN);
        req.userid = decryptToken.userid;
        next();
    } catch (error) {
        res.send(error.message);
    }
}
module.exports = autmiddleware;