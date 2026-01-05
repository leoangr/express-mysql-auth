import pool from "../db/connect.db.js";

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT id_user FROM user WHERE email = ?", [email]);
  return rows;
};

export const createUser = async (username, email, hashedPassword, ipAddress) => {
    const [result] = await pool.query("INSERT INTO user (username, email, password, ip_address) VALUES(?, ?, ?, ?)", [
        username, email, hashedPassword, ipAddress
    ]);
    return result;
};

export const getUserByEmail = async (email) => {
    const [rows] = await pool.query("SELECT id_user, email, password FROM user WHERE email = ? LIMIT 1", [
        email
    ]);
    return rows
}

export const getUserById = async (userId) => {
    const [rows] = await pool.query("SELECT id_user, username, email FROM user WHERE id_user = ? LIMIT 1", [
        userId
    ]);
    return rows
}