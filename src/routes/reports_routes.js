const controller = require('../controllers/reports_controller');
const {checkAuth} = require('../helpers/auth');

module.exports = (app) => {
    app.get('/api/users/:id/reports', checkAuth, (req, res) => {
        controller.reportsByUserId(req, res);
    });

    app.post('/api/users/:id/reports', checkAuth, (req, res) => {
        controller.createReport(req, res);
    });

    app.put('/api/users/:id/reports/:reportId', checkAuth, (req, res) => {
        controller.updateReport(req, res);
    });

    app.delete('/api/users/:id/reports/:reportId', checkAuth, (req, res) => {
        controller.deleteReport(req, res);
    });
}