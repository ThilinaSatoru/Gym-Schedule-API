const express = require("express");
const router = express.Router();
const postgres = require("../database/db");
const userService = require("../service/userService");
const log = require('../utils/logger');


// Create a new user
router.post("/", async (req, res) => {
    try {
        const userData = req.body;
        const newUser = await userService.create(userData);
        res.status(201).json(newUser);
        log.bgY("Created New User.");
    } catch (err) {
        log.R("Error creating user", err);
        if (err.code === '23505') { // Unique violation error code
            res.status(409).send("Email already exists");
        } else {
            res.status(500).send("Error creating user");
        }
    }
});


// 2. Read all exercises (GET)
router.get("/", async (req, res) => {
    try {
        const users = await userService.getAll(); // Call the service layer
        res.json(users);
        log.bgG("Get Users.");
    } catch (err) {
        log.R("Error retrieving users", err);
        res.status(500).send("Error retrieving users");
    }
});


module.exports = router;
