const controller = require("../controllers/session_controller")

module.exports = (app) => {
    app.get('/api/register', (req, res) => {
        controller.register(req, res);
    })
}