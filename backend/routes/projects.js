const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/projects', async(req, res, next) => {
    try {
        const projects = await Project.find();
        console.log(projects);
        res.json(projects);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});



module.exports = router;
