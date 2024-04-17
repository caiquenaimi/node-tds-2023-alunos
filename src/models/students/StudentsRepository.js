import pg from "../../database/index.js";

export default class StudentsRepository {
  constructor() {
    this.pg = pg;
  }

  async getStudents() {
    try {
      const allStudents = await this.pg.manyOrNone("SELECT * FROM students");
      return allStudents;
    } catch (error) {
      console.log("Failed to get students", error);
      throw error;
    }
  }

  async getStudentById(id) {
    try {
      const student = await this.pg.manyOrNone("SELECT * FROM students WHERE id = $1", [id]);
      return student;
    } catch (error) {
      console.log(`Failed to get student with id: ${id}`, error);
      throw error;
    }
  }

  async getStudentByName(email) {
    //console.log('Bora ver o name', name);
    try {
      const student = await this.pg.manyOrNone("SELECT * FROM students WHERE email = $1", email);
      return student;
    } catch (error) {
      console.log(`Failed to get student with name: ${email}`, error);
      throw error;
    }
  }

  async createStudent(student) {
    console.log('Bora ver o student', student);
    try {
      await this.pg.none("INSERT INTO students (id, name, age, email, code, grade) VALUES ($1, $2, $3, $4, $5, $6)", [student.id, student.name, student.age, student.email, student.code, student.grade]);
      return student;
    } catch (error) {
      console.log("Failed to create student", error);
      throw error;
    }
  }

 async updateStudent(id, name, age, email, code, grade) {
    try {
      const student = this.getStudentById(id);

      if (!student) {
        return null;
      }

      const updatedStudent = await this.pg.none("UPDATE students SET name = $1, age = $2, email = $3, code = $4, grade = $5 WHERE id = $6", [name, age, email, code, grade, id]);
      return updatedStudent;
    } catch (error) {
      console.log(`Failed to update student with id: ${id}`, error);
      throw error;
    }
  }

 async deleteStudent(id) {
  try {
    await this.pg.none("DELETE FROM students WHERE id = $1", [id]);
  } catch (error) {
    console.log(`Failed to delete student with id: ${id}`, error);
    throw error;
  }
  }
}
