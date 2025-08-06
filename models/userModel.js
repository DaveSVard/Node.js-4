const pool = require("../db.js");

class UserModel {
  async getAllUsers() {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }

  async getSingleUser(id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
  }

  async createUser(full_name, email, phone) {
    const result = await pool.query(
      "INSERT INTO users (full_name, email, phone) VALUES ($1, $2, $3) RETURNING *",
      [full_name, email, phone]
    );

    return result.rows[0];
  }

  async updateUser(id, full_name, email, phone) {
    const result = await pool.query(
      "UPDATE users SET full_name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *",
      [full_name, email, phone, id]
    );
    return result.rows[0];
  }

  async deleteUserByID(id) {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
}

module.exports = new UserModel();
