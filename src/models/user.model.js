import pool from "../config/db.js";


export const findByEmail = async (email) => {

    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await pool.query(sql, [email]);
    return rows[0] ?? null;

}

