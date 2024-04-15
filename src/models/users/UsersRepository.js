import pg from "../../database/index.js";


export default class UsersRepository {
  constructor() {
    this.pg = pg;
  }

  async getUsers() {
    const allUsers = await this.pg.manyOrNone("SELECT * FROM users");
    console.log(allUsers);
    return allUsers;
  }

  async getUserById(id) {
    const user = await this.pg.oneOrNone("SELECT * FROM users WHERE id = $1", [id]);
    console.log(user);
    return user;
  }

  async getUserByEmail(email) {
    const user = await this.pg.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
    console.log(user);
    return user;
  }

  async createUser(user) {
    await this.pg.none("INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)", [user.id, user.name, user.email, user.password]);
    return user;
  }

  async updateUser(id, name, email, password) {
    const user = this.getUserById(id);

    if (!user) {
      return null;
    }

    const updatedUser = await this.pg.none("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4", [name, email, password, id]);

    return updatedUser;
  }

  async deleteUser(id) {
    await this.pg.none("DELETE FROM users WHERE id = $1", [id]);
  }
}