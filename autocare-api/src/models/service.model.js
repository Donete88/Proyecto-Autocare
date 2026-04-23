const db = require('../config/db');

const Service = {
  findAll: async () => {
    const [rows] = await db.execute('SELECT * FROM servicios');
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM servicios WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (serviceData) => {
    const { nombre, descripcion, precio } = serviceData;
    const [result] = await db.execute(
      'INSERT INTO servicios (nombre, descripcion, precio) VALUES (?, ?, ?)',
      [nombre, descripcion, precio]
    );
    return result.insertId;
  },

  update: async (id, serviceData) => {
    const { nombre, descripcion, precio } = serviceData;
    const [result] = await db.execute(
      'UPDATE servicios SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?',
      [nombre, descripcion, precio, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM servicios WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Service;
