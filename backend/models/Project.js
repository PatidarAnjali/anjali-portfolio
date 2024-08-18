const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {type: String, required: true},
    // image: {type: String, required: true},
    description: {type: String, required: true},
    technologies: {type: [String], required: true},
    link: {type: String, required: true},
});

module.exports = mongoose.model('Project', ProjectSchema);