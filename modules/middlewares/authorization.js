const db = require('../../db/db');
const jwt = require('jsonwebtoken');
const secretKey = 'secret-key';
// const authService = require('./auth');


let authorized = (permission) => async (req, res, next) => {
    const userId = getIdByToken(req);

    let groups = await db('user_group').select('group_id')
        .where({user_id: userId});

    let auth = !!0;

    for (const group of groups) {
        let permissions;
        permissions = await db('group_permission').select('code_id')
            .where({group_id: group.group_id});

        for(const perm of permissions){

            if (perm.code_id === permission[0]) {
                auth = !0;
                break;
            }
        }

        const id = req.params.user_id;
        // console.log(id)
        if(id){
            if(id === userId.toString())
                auth = !0;
        }
        // console.log(auth)

        if (auth === true) {
            next();
            return true;
        } else {
            res.status(500).json("Unauthorized access!");
            return false;
        }
    }
    // return res.status(401).json({message: 'not authorized!'});
}

function getIdByToken(req) {
    const token = req.header('Authorization');
    let userId;
    jwt.verify(token, secretKey, (error, decoded) => {
        if (error) {
            // Handle token verification error (e.g., token expired, invalid signature, etc.)
            console.error('Token verification failed:', error);
            // You might want to send a response indicating authentication failure
        } else {
            // Access the user's ID from the decoded token payload
            userId = decoded.userId;
            // console.log('User ID:', userId);
        }
    });
    return userId;
}

module.exports = {
    authorized,

};
