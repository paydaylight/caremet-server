const {checkAuth} = require('../helpers/auth');
const controller = require('../controllers/users_controller');

module.exports = (app) => {
    app.get('/api/users/:id', checkAuth, (req, res) => {
        controller.getUserById(req, res);
    })
}