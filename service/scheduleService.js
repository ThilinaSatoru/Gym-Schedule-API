const pool = require("../database/db");


class ScheduleService {

    async createSchedule(userId, scheduleData) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // Insert the schedule
            const scheduleQuery = `
                INSERT INTO Schedule (user_id, start_date)
                VALUES ($1, $2)
                RETURNING id;
            `;
            const scheduleResult = await client.query(scheduleQuery, [userId, scheduleData.start_date]);
            const scheduleId = scheduleResult.rows[0].id;

            // Insert days and exercises
            for (const day of scheduleData.days) {
                const dayQuery = `
                    INSERT INTO Day (schedule_id, day_number)
                    VALUES ($1, $2)
                    RETURNING id;
                `;
                const dayResult = await client.query(dayQuery, [scheduleId, day.day_number]);
                const dayId = dayResult.rows[0].id;

                for (const exercise of day.exercises) {
                    const exerciseQuery = `
                        INSERT INTO DayExercise (day_id, exercise_id, order_number)
                        VALUES ($1, $2, $3);
                    `;
                    await client.query(exerciseQuery, [dayId, exercise.exercise_id, exercise.order_number]);
                }
            }

            await client.query('COMMIT');
            return { scheduleId };
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error creating schedule:', error);
            throw error;
        } finally {
            client.release();
        }
    }

    async getExercisesByUserGroupedByDay(userId) {
        const query = `
            SELECT 
                d.day_number,
                json_agg(json_build_object(
                    'id', e.id,
                    'name', e.name,
                    'model', e.model,
                    'animation', e.animation,
                    'thumbnail', encode(e.thumbnail, 'base64'),
                    'note', e.note,
                    'status', e.status,
                    'order_number', de.order_number
                ) ORDER BY de.order_number) as exercises
            FROM 
                Schedule s
                JOIN Day d ON s.id = d.schedule_id
                JOIN DayExercise de ON d.id = de.day_id
                JOIN Exercise e ON de.exercise_id = e.id
            WHERE 
                s.user_id = $1
                AND s.status = TRUE
            GROUP BY 
                d.day_number
            ORDER BY 
                d.day_number;
        `;

        try {
            const result = await pool.query(query, [userId]);
            return result.rows.map(row => ({
                day_number: row.day_number,
                exercises: row.exercises.map(exercise => ({
                    ...exercise,
                    thumbnail: exercise.thumbnail ? `data:image/jpeg;base64,${exercise.thumbnail}` : null
                }))
            }));
        } catch (error) {
            console.error('Error fetching exercises by user grouped by day:', error);
            throw error;
        }
    }
}


module.exports = new ScheduleService();