const jwt = require('jsonwebtoken');

const secretKey = 'secret-key';

const authenticated = (req, res, next) => {
    // const token = req.query.secret_token;
    const token = req.  header('Authorization');
    // console.log(token); // if you use the authorization section with Bearer token type use: .split(' ').at(1)

    if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalid or expired' });
        }
        if (!decoded.userId || !decoded.email) {
            return res.status(401).json({ message: 'Invalid token payload' });
        }
        req.user = decoded; // Attach user information to the request
        next();
    });
};

// how to check if the user is signed in when he tries to get to specific pages, because the token may be valid while the user has logged out.

module.exports = {
    authenticated,
};
