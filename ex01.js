import User from "../models/User.js";
import Loan from "../models/Loan.js";

// 1. Criar usuário
const createUser = async (data) => {
  const { nome, email } = data;

  if (!nome || !email) {
    throw new Error("Nome e email são obrigatórios");
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    throw new Error("Email já cadastrado");
  }

  return User.create({
    nome,
    email,
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
const updateUser = async (id, data) => {
  const user = await User.findById(id);
  if (!user) throw new Error("Usuário não encontrado");

  if (data.email) {
    const emailExists = await User.findOne({ email: data.email });
    if (emailExists && emailExists._id.toString() !== id) {
      throw new Error("Email já está em uso");
    }
  }

  return User.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

// 5. Desativar usuário
const deactivateUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("Usuário não encontrado");

  const activeLoans = await Loan.findOne({
    userId: id,
    status: "ativo",
  });

  if (activeLoans) {
    throw new Error(
      "Não é possível desativar usuário com empréstimos ativos"
    );
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
