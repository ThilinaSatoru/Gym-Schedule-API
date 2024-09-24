const express = require("express");
const router = express.Router();
const exerciseService = require('../service/exerciseService');

// 1. Create a new Exercise (POST)
router.post("/", async (req, res) => {
    try {
        const exercise = await exerciseService.createExercise(req.body);
        res.status(201).json(exercise);
    } catch (err) {
        console.error("Error creating exercise", err);
        res.status(500).send("Error creating exercise");
    }
});

// 2. Read all exercises (GET)
router.get("/", async (req, res) => {
    try {
        const exercises = await exerciseService.getAllExercises();
        res.json(exercises);
    } catch (err) {
        console.error("Error retrieving exercises", err);
        res.status(500).send("Error retrieving exercises");
    }
});

// 3. Read a specific exercise by ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const exercise = await exerciseService.getExerciseById(req.params.id);
        if (!exercise) {
            return res.status(404).send("Exercise not found");
        }
        res.json(exercise);
    } catch (err) {
        console.error("Error retrieving exercise", err);
        res.status(500).send("Error retrieving exercise");
    }
});

// 4. Update an exercise (PUT)
router.put("/:id", async (req, res) => {
    try {
        const updatedExercise = await exerciseService.updateExercise(req.params.id, req.body);
        if (!updatedExercise) {
            return res.status(404).send("Exercise not found");
        }
        res.json(updatedExercise);
    } catch (err) {
        console.error("Error updating exercise", err);
        res.status(500).send("Error updating exercise");
    }
});

// 5. Delete an exercise (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await exerciseService.deleteExercise(req.params.id);
        if (!deleted) {
            return res.status(404).send("Exercise not found");
        }
        res.status(204).send(); // No Content
    } catch (err) {
        console.error("Error deleting exercise", err);
        res.status(500).send("Error deleting exercise");
    }
});

module.exports = router;