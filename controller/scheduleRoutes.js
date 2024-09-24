const express = require("express");
const router = express.Router();
const scheduleService = require('../service/scheduleService');
const log = require('../utils/logger');


// Create a new schedule for a user
router.post("/user/:id", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const scheduleData = req.body;
        const result = await scheduleService.createSchedule(userId, scheduleData);
        res.status(201).json(result);
        log.bgY("Created new Schedule for user : " + userId);
    } catch (err) {
        log.R("Error creating Schedule", err);
        res.status(500).send("Error creating schedule");
    }
});



// Get exercises grouped by day for a specific user
router.get("/user/:id/grouped-by-day", async (req, res) => {
    try {
        const userId = parseInt(req.params.id);
        const exercises = await scheduleService.getExercisesByUserGroupedByDay(userId);
        res.json(exercises);
        log.bgG("Get Schedule grouped-by-day user: " + userId);
    } catch (err) {
        log.R("Error retrieving exercises grouped by day", err);
        res.status(500).send("Error retrieving exercises grouped by day");
    }
});



module.exports = router;