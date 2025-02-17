const router = require('express').Router();
const mongoose = require('mongoose'); 
let Exercise = require('../models/exercise.model');

// Get all exercises
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Add a new exercise
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get exercise by ID
router.route('/:id').get((req, res) => {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Invalid ID format');
    }
    
    Exercise.findById(req.params.id)
        .then(exercise => {
            if (!exercise) return res.status(404).json('Exercise not found');
            res.json(exercise);
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Delete exercise by ID
router.route('/:id').delete((req, res) => {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Invalid ID format');
    }

    Exercise.findByIdAndDelete(req.params.id)
        .then((deletedExercise) => {
            if (!deletedExercise) return res.status(404).json('Exercise not found');
            res.json("Exercise deleted.");
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

// Update exercise by ID
router.route('/update/:id').post((req, res) => {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json('Invalid ID format');
    }

    Exercise.findById(req.params.id)
        .then(exercise => {
            if (!exercise) return res.status(404).json('Exercise not found');

            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
