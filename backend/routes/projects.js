const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/projects', async(req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// POST a new project
router.post('/projects', async(req, res) => {
    const project = new Project(req.body);
    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
})

module.exports = router;