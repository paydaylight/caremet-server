const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = {
    reportsByUserId: async (req, res) => {
        const {id} = req.params;
        let reports = await User.findMany({_id: id}).select('reports')

        return res.status(200).send(reports)
    },

    createReport: async (req, res) => {
        const {id} = req.params;
        const {} = req.query;

        let result = User.findByIdAndUpdate(id, {}).then(() => {
            return res.status(200).send(result);
        }).catch(() => {
            return res.status(500).send();
        });
    }
}