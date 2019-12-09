const mongoose = require('mongoose');
const User = mongoose.model('users');
const Report = mongoose.model('reports');

module.exports = {
    reportsByUserId: async (req, res) => {
        const {id} = req.params;
        const {filter} = req.query;
        // let reports = await User.findMany({_id: id}).select('reports')
        Report.where({sender: id})
        .sort({date: filter})
        .then((report) => {
            return res.status(200).send(report)
         }).catch((err) => {
             console.log(err)
            return res.status(500).send(err);
        })
       
    },

    updateReport: async (req, res) => {
        const {id, reportId} = req.params;
        const {status, title, date, text, event_title} = req.body;
        
        Report.where({sender: id, _id: reportId}).then((report) => {
            Report.updateOne({_id: reportId}, {
                status: status, 
                title: title, 
                text: text, 
                date: date, 
                event_title: event_title
            }).then((result) => { return res.status(200).send(result); }).catch((err) => {
                console.log(err)
                return res.status(500).send(err);
            })
            
        }).catch(() => {
            return res.status(500).send();
        });
    },
    
    createReport: async (req, res) => {
        const {id} = req.params;
        const {status, title, date, text, event_title} = req.body;
        
        Report.create({
            sender: id, 
            status: status, 
            title: title, 
            text: text, 
            date: date, 
            event_title: event_title
        }).then((result) => {
            return res.status(200).send(result);
        }).catch(() => {
            return res.status(500).send();
        });
    },

    deleteReport: async (req, res) => {
        const {id, reportId} = req.params;
        // const {status, title, date, text, event_title} = req.query;

        Report.findByIdAndDelete(reportId)
        .then((result) => {
            return res.status(200).send(result);
        }).catch(() => {
            return res.status(500).send();
        });
    }
}