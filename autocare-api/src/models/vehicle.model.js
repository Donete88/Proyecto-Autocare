const db = require('../config/db');

const Vehicle = {
  findAll: async () => {
    const [rows] = await db.execute(`
      SELECT v.*, u.nombre as propietario 
      FROM vehiculos v 
      JOIN usuarios u ON v.usuario_id = u.id
    `);
    return rows;
  },

  findByUserId: async (usuario_id) => {
    const [rows] = await db.execute('SELECT * FROM vehiculos WHERE usuario_id = ?', [usuario_id]);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM vehiculos WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (vehicleData) => {
    const { usuario_id, marca, modelo, matricula, año } = vehicleData;
    const [result] = await db.execute(
      'INSERT INTO vehiculos (usuario_id, marca, modelo, matricula, año) VALUES (?, ?, ?, ?, ?)',
      [usuario_id, marca, modelo, matricula, año]
    );
    return result.insertId;
  },

  update: async (id, vehicleData) => {
    const { marca, modelo, matricula, año } = vehicleData;
    const [result] = await db.execute(
      'UPDATE vehiculos SET marca = ?, modelo = ?, matricula = ?, año = ? WHERE id = ?',
      [marca, modelo, matricula, año, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM vehiculos WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Vehicle;
