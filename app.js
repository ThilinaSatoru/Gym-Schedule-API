const express = require("express");
const bodyParser = require("body-parser");
const exerciseController = require("./controller/exerciseRoutes"); // Import the new controller
const scheduleController = require("./controller/scheduleRoutes");
const userController = require("./controller/userRoutes");

const app = express();
const port = 3030;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));

// Routes
app.use("/exercises", exerciseController); // Use the separated controller
app.use("/schedule", scheduleController);
app.use("/user", userController);





// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
