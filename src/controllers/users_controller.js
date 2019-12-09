const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = {
    getUserById: async (req, res) => {
        const {id} = req.params
        let user = User.findById(id)
        return res.status(200).send(user)
    }
}