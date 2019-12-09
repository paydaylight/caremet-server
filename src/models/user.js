const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: String,
    uid: String,
    name: String,
    surname: String,
    reports: [
        {
            title: String,
            
        }
    ]
})

mongoose.model('users', userSchema);