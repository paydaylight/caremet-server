const admin = require('firebase-admin');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = {
    
    checkAuth: (req, res, next) => {
        if(req.headers.authorization){
            admin.auth().verifyIdToken(req.headers.authorization, true).then((decodedToken) => {
                if(req.params.id){
                    const {id} = req.params
                    User.findById(id).select('uid').then((user) => {
                        if(user.uid !== decodedToken.uid){
                            return res.status(403).send('Unauthorized');
                        }else{
                            next();
                        }
                    }).catch(() => {
                        return res.status(403).send('Unauthorized');
                    })
                }else{
                    return res.status(403).send('Unauthorized');
                }
            }).catch((err) => {
                return res.status(403).send('Unauthorized');
            });
        } else {
            return res.status(403).send('Unauthorized');
        }
    }
}