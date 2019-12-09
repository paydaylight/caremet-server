const mongoose = require('mongoose');
const User = mongoose.model('users');
const admin = require('firebase-admin');

module.exports = {
    register: async (req, res) => {
        const {email, password, firstName, lastName} = req.body;
        admin.auth().createUser({
            email: email, 
            password: password,
            emailVerified: false,
            disabled: false,
            displayName: `${firstName} ${lastName}`
        }).then(() => { 
            User.create({ email: email, name: firstName, surname: lastName }, {upsert: true}).then((user) => {
                return res.status(200).send(user.id);
            }).catch(() => {
                return res.status(500).send();
            })
         })
        .catch(error => { 
            return res.status(500).send();
         })     
    },

    login: async (req, res) => {
        if(req.headers.authorization) {
            admin.auth().verifyIdToken(req.headers.authorization).then((decodedToken) => {
                admin.auth().getUser(decodedToken.uid)
                .then((userRecord) => {
                    User.findOneAndUpdate({email: userRecord.toJSON().email}, {uid: decodedToken.uid}).then((record) => {
                        return res.status(200).send({id: record._id});
                    }).catch((err) => {
                        return res.status(403).send('Unauthorized');
                    });
                })
                
            }).catch(() => {
                return res.status(403).send('Unauthorized');
            });
        } else {
            return res.status(403).send('Unauthorized');
        }
        
        // return res.status(200).send({});
    }
}