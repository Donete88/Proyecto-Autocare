const db = require('../config/db');

const User = {
  /**
   * Buscar todos los usuarios (excluyendo la contraseña)
   */
  findAll: async () => {
    const [rows] = await db.execute('SELECT id, nombre, email, rol, created_at, updated_at FROM usuarios');
    return rows;
  },

  /**
   * Buscar usuario por ID (excluyendo la contraseña)
   */
  findById: async (id) => {
    const [rows] = await db.execute('SELECT id, nombre, email, rol, created_at, updated_at FROM usuarios WHERE id = ?', [id]);
    return rows[0];
  },

  /**
   * Buscar usuario por Email (incluyendo contraseña para login)
   */
  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0];
  },

  /**
   * Crear un nuevo usuario
   */
  create: async (userData) => {
    const { nombre, email, contraseña, rol = 'cliente' } = userData;
    const [result] = await db.execute(
      'INSERT INTO usuarios (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)',
      [nombre, email, contraseña, rol]
    );
    return result.insertId;
  },

  /**
   * Actualizar un usuario
   */
  update: async (id, userData) => {
    const { nombre, rol } = userData;
    const [result] = await db.execute(
      'UPDATE usuarios SET nombre = ?, rol = ? WHERE id = ?',
      [nombre, rol, id]
    );
    return result.affectedRows > 0;
  },

  /**
   * Eliminar un usuario
   */
  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = User;
