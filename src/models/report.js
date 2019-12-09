const mongoose = require('mongoose');
const {Schema} = mongoose;

const reportSchema = new Schema({
    status: String,
    title: String,
    date: Date,
    text: String,
    sender: {type: Schema.Types.ObjectId, ref: 'userSchema'},
    event_title: String
})

mongoose.model('reports', reportSchema);