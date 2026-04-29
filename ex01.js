import User from "../models/User.js";
import Loan from "../models/Loan.js";

// 1. Criar usuário
const createUser = async ({ nome, email, telefone, idade }) => {
  if (!nome || !email || idade === undefined) {
    throw new Error("Nome, email e idade são obrigatórios");
  }

  if (idade < 0) {
    throw new Error("Idade inválida");
  }

  const exists = await User.findOne({ email });
  if (exists) {
    throw new Error("Email já cadastrado");
  }

  return User.create({
    nome,
    email,
    telefone,
    idade,
    ativo: true,
  });
};

// 2. Listar usuários
const getAllUsers = async () => {
  return User.find();
};

// 3. Buscar por ID
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("Usuário não encontrado");
  return user;
};

// 4. Atualizar usuário
const updateUser = async (id, { nome, email, telefone, idade }) => {
  const user = await User.findById(id);
  if (!user) throw new Error("Usuário não encontrado");

  if (email) {
    const exists = await User.findOne({ email });
    if (exists && exists._id.toString() !== id) {
      throw new Error("Email já está em uso");
    }
  }

  if (idade !== undefined && idade < 0) {
    throw new Error("Idade inválida");
  }

  return User.findByIdAndUpdate(
    id,
    { nome, email, telefone, idade },
    { new: true, runValidators: true }
  );
};

// 5. Desativar usuário
const deactivateUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("Usuário não encontrado");

  const activeLoan = await Loan.findOne({
    userId: id,
    status: "ativo",
  });

  if (activeLoan) {
    throw new Error("Usuário possui empréstimos ativos");
  }

  user.ativo = false;
  return user.save();
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deactivateUser,
};
