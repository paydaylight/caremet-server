const controller = require("../controllers/session_controller")

module.exports = (app) => {
    app.post('/api/register', (req, res) => {
        controller.register(req, res);
    });

    app.post('/api/login', (req, res) => {
        controller.login(req, res);
    });
}