const { authEmail } = require('../controller/userController');
var jwt = require('jsonwebtoken');
var secretKey = 'STkey'

exports.authorization = (req, res, next) => {
    try {
        let token = req.headers.token;
        if (token) {
            var decoded = jwt.verify(token, secretKey);
            if (decoded) {
                authEmail(decoded.email, (result) => {
                    if (result) {
                        next()
                    } else {
                        return res.status(401).json({ "Error": "Token Is Not Verified..!" });
                    }
                })

            } else {
                return res.status(401).json({ "Error": "Unauthorized access Token Not Match!!!!!!" });
            }
        } else {
            return res.status(401).json({ "Error": "Unauthorized access Token Not Match!!!!!!" });
        }
    } catch (err) {
        return res.status(401).json({ "Error": "Unauthorized access Token Not Found" });
    }
};
