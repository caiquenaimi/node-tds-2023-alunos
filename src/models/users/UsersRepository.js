import pg from "../../database/index.js";


export default class UsersRepository {
  constructor() {
    this.pg = pg;
  }

  async getUsers() {
    try {
      const allUsers = await this.pg.manyOrNone("SELECT * FROM users");
      /* console.log(allUsers); */
      return allUsers;
    } catch (error) {
      console.log("Failed to get users", error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE id = $1", [id]);
      /* console.log(user); */
      return user;
    } catch (error) {
      console.log(`Failed to get user with id: ${id}`, error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
      /*  console.log(user); */
      return user;
    } catch (error) {
      console.log("Failed to get user by email", error);
      throw error;
    }
  }

  async createUser(user) {
    try {
      await this.pg.none("INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)", [user.id, user.name, user.email, user.password]);
      return user;
    } catch (error) {
      console.log("Failed to create user", error);
      throw error;
    }
  }

  async updateUser(id, name, email, password) {
    try {
      const user = this.getUserById(id);

      if (!user) {
        return null;
      }

      const updatedUser = await this.pg.none("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4", [name, email, password, id]);

      return updatedUser;
    } catch (error) {
      console.log("Failed to update user", error);
      throw error;
    }
  }

  async deleteUser(id) {
    try {
      await this.pg.none("DELETE FROM users WHERE id = $1", [id]);
    } catch (error) {
      console.log("Failed to delete user", error);
      throw error;
    }
  }
}