/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class AdminManager extends AbstractManager {
  constructor() {
    super({ table: "admins" });
  }

  getUserByName(userName) {
    return this.database.query(
      `SELECT * from ${this.table} WHERE username = ?`,
      [userName]
    );
  }

  createAdmin(userName, password_hash) {
    return this.database.query(
      `INSERT INTO ${this.table} (username, password_hash) VALUES (?,?)`,
      [userName, password_hash]
    );
  }
}
module.exports = AdminManager;
