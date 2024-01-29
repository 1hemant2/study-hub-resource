const jwt = require('jsonwebtoken');

const autmiddleware = (req, res, next) => {
    try {
        // console.log(req.header);
        const token = req.header("authentication");
        const decryptToken = jwt.verify(token, process.env.SECRET_TOKEN);
        // console.log(decryptToken.userid);
        req.body.userid = decryptToken.userid;
        next();
    } catch (error) {
        res.send(error.message);
    }
}
module.exports = autmiddleware;