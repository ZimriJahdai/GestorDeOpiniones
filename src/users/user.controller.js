import User from "./user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Registro
export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const exists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Usuario o correo ya existe",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = new User({
      username,
      email,
      password: hash,
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Usuario creado",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    const valid = bcrypt.compareSync(password, user.password);

    if (!valid) {
      return res.status(400).json({
        success: false,
        message: "Credenciales inválidas",
      });
    }

    const token = jwt.sign(
      {
        sub: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Perfil
export const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({
    success: true,
    user,
  });
};


// Actualizar perfil
export const updateProfile = async (req, res) => {
  const { username, email } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) return res.status(404).json({ message: "No existe" });

  user.username = username || user.username;
  user.email = email || user.email;

  await user.save();

  res.json({
    success: true,
    message: "Perfil actualizado",
  });
};

// Cambiar contraseña
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user.id);

  const valid = bcrypt.compareSync(oldPassword, user.password);

  if (!valid) {
    return res.status(400).json({
      message: "Contraseña actual incorrecta",
    });
  }

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(newPassword, salt);

  await user.save();

  res.json({
    success: true,
    message: "Contraseña cambiada",
  });
};
