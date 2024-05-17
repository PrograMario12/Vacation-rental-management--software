import bcrypt from "bcrypt";
import { pool } from "../db.js";
import { createAccessToken } from "../libs/jwt.js";
import md5 from 'md5';

export const signin = async (req, res) => {
  const { empleado_id, contrasena_hash } = req.body;

  const result = await pool.query("SELECT * FROM usuarios WHERE empleado_id = $1", [
    empleado_id,
  ]);

  if (result.rowCount === 0) {
    return res.status(400).json({
      message: "El usuario no existe",
    });
  }

  const validPassword = await bcrypt.compare(contrasena_hash, result.rows[0].contrasena_hash);

  if (!validPassword) {
    return res.status(400).json({
      message: "La contraseña es incorrecta",
    });
  }

  const token = await createAccessToken({ id: result.rows[0].empleado_id });

  res.cookie("token", token, {
    httpOnly: true,
    // secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  return res.json(result.rows[0]);
};

export const signup = async (req, res, next) => {
  const { email, empleado_id, contrasena_hash, rol_id, ultimo_acceso, activo } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(contrasena_hash, 10);
    const gravatar = `https://www.gravatar.com/avatar/${md5(email)}`;

    const result = await pool.query(
      "INSERT INTO usuarios(email, empleado_id, contrasena_hash, rol_id, ultimo_acceso, activo, avatar) VALUES($1, $2, $3, $4, $5, $6, $7) Returning *",
      [email, empleado_id, hashedPassword, rol_id, ultimo_acceso, activo, gravatar]
    );

    const token = await createAccessToken({ id: result.rows[0].usuario_id });

    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json(result.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        message: "El correo ya esta registrado",
      });
    }

    next(error);
  }
};

export const profile = async (req, res) => { 
  const result = await pool.query('SELECT * FROM usuarios WHERE usuario_id = $1', [req.userId]);
  return res.json(result.rows[0]);
}

export const signout = (req, res) => {
  res.clearCookie('token');
  res.sendStatus(200);
}