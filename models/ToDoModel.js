const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['todo', 'inProgress', 'done'],
        required: true
    }

});
module.exports = mongoose.model('ToDo', todoSchema);