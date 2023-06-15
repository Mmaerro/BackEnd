import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  rol: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

// Función de pre-guardado para encriptar la contraseña
userSchema.pre("save", async function (next) {
  // Si la contraseña no ha sido modificada, pasa al siguiente middleware
  if (!this.isModified("password")) {
    return next();
  }

  try {
    // Generar una sal aleatoria
    const salt = await bcrypt.genSalt(10);

    // Encriptar la contraseña con la sal generada
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Reemplazar la contraseña con la contraseña encriptada
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const userModel = model("users", userSchema);
