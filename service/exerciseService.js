const pool = require('../database/db');

class ExerciseService {
    async createExercise(exerciseData) {
        const { name, model, animation, thumbnail, note, status } = exerciseData;
        const query = `
            INSERT INTO Exercise (name, model, animation, thumbnail, note, status)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;

        const base64Data = thumbnail.split(',')[1];
        const thumbnailBuffer = Buffer.from(base64Data, 'base64');

        const result = await pool.query(query, [
            name,
            model,
            animation,
            thumbnailBuffer,
            note,
            status,
        ]);

        return {
            ...result.rows[0],
            thumbnail: `data:image/jpeg;base64,${result.rows[0].thumbnail.toString('base64')}`
        };
    }

    async getAllExercises() {
        const result = await pool.query("SELECT * FROM Exercise");
        return result.rows.map(row => ({
            ...row,
            thumbnail: row.thumbnail ? `data:image/jpeg;base64,${row.thumbnail.toString('base64')}` : null
        }));
    }

    async getExerciseById(id) {
        const result = await pool.query("SELECT * FROM Exercise WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0];
    }

    async updateExercise(id, exerciseData) {
        const { name, model, animation, thumbnail, note, status } = exerciseData;
        const query = `
            UPDATE Exercise 
            SET name = $1, model = $2, animation = $3, thumbnail = $4, note = $5, status = $6
            WHERE id = $7
            RETURNING *;
        `;

        let thumbnailBuffer = null;
        if (thumbnail) {
            const base64Data = thumbnail.split(',')[1];
            thumbnailBuffer = Buffer.from(base64Data, 'base64');
        }

        const result = await pool.query(query, [
            name,
            model,
            animation,
            thumbnailBuffer,
            note,
            status,
            id
        ]);

        if (result.rows.length === 0) {
            return null;
        }

        return {
            ...result.rows[0],
            thumbnail: result.rows[0].thumbnail
                ? `data:image/jpeg;base64,${result.rows[0].thumbnail.toString('base64')}`
                : null
        };
    }

    async deleteExercise(id) {
        const result = await pool.query(
            "DELETE FROM Exercise WHERE id = $1 RETURNING *",
            [id]
        );
        return result.rows.length > 0;
    }

}

module.exports = new ExerciseService();