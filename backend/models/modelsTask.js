const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    title: {type: String, required: true},
    status: {type: Boolean, default: false},
    category: {type: String},
    date: { type: Date,
        default: Date.now},
    priority: {type: String, enum:["High", "Medium", "Low"]},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Task', taskSchema);