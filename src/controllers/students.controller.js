import Student from "../models/students/Student.js";
import StudentsRepository from "../models/students/StudentsRepository.js";

const studentsRepository = new StudentsRepository();

export const getStudents = async (req, res) => {
  try {
    const students = await studentsRepository.getStudents();
    if (students.length) {
      return res.status(200).json(students);
    }
    return res.status(200).json({ message: "Não há estudantes cadastrados" });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar estudantes", error: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentsRepository.getStudentById(id);

    if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

    return res.send(student);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao buscar estudante", error: error.message });
  }
};

export const createStudent = async (req, res) => {
  try {
    const { name, age, email, code, grade } = req.body;

    // const studentAlreadyExists = await studentsRepository.getStudentByName(email);

    // if (studentAlreadyExists) {
    //   return res.status(409).send({ message: "Estudante já cadastrado" });
    // }

    const student = new Student(name, age, email, code, grade);

    console.log(student);

    await studentsRepository.createStudent(student);

    return res.status(201).send(student);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar estudante", error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, email, code, grade } = req.body;

    const studentById = await studentsRepository.getStudentById(id);
    const studentByName = await studentsRepository.getStudentByName(name);

    if (!studentById) {
      return res.status(404).send({ message: "Estudante não encontrado" });
    }

    if (studentByName && studentByName.id !== id) {
      return res.status(409).send({ message: "Já existe um estudante com esse nome" });
    }

    await studentsRepository.updateStudent(id, name, age, email, code, grade);
    return res.send({ message: "Estudante atualizado com sucesso", student: { id, name, age, email, code, grade } });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao atualizar estudante", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await studentsRepository.getStudentById(id);

    if (!student) res.status(404).send({ message: "Estudante não encontrado!" });

    await studentsRepository.deleteStudent(id);

    return res.send(student);
  } catch (error) {
    return res.status(500).send({ message: "Erro ao deletar estudante", error: error.message });
  }
};
