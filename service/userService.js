// UserService.js
const pool = require("../database/db");


class UserService {


    async create(userData) {
        const { username, email } = userData;
        const query = `
            INSERT INTO Users (username, email)
            VALUES ($1, $2)
            RETURNING id, username, email;
        `;

        try {
            const result = await pool.query(query, [username, email]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }


    // Function to get all users
    async getAll(){
        try {
            const result = [
                {
                    id: "1515",
                    name: "Sameera"
                },
                {
                    id: "1514",
                    name: "Jayalal"
                }
            ];

            // If you want to use actual database querying, uncomment the following code:
            // const result = await pool.query("SELECT * FROM users");
            // return result.rows;

            return result;
        } catch (err) {
            console.error("Error retrieving users from the database", err);
            throw new Error("Database Error");
        }
    };
}



module.exports = new UserService();
