const express = require("express");
const router = express.Router();
const scheduleService = require('../service/scheduleService');



// Create a new schedule for a user
router.post("/user/:userId/schedule", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const scheduleData = req.body;
        const result = await scheduleService.createSchedule(userId, scheduleData);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error creating schedule", err);
        res.status(500).send("Error creating schedule");
    }
});



// Get exercises grouped by day for a specific user
router.get("/user/:userId/grouped-by-day", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);
        const exercises = await scheduleService.getExercisesByUserGroupedByDay(userId);
        res.json(exercises);
    } catch (err) {
        console.error("Error retrieving exercises grouped by day", err);
        res.status(500).send("Error retrieving exercises grouped by day");
    }
});



module.exports = router;