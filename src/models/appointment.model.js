const db = require('../config/db');

const Appointment = {
  findAll: async () => {
    const [rows] = await db.execute(`
      SELECT c.*, 
             u.nombre as usuario_nombre, 
             v.marca as vehiculo_marca, v.modelo as vehiculo_modelo, v.matricula as vehiculo_matricula,
             s.nombre as servicio_nombre, s.precio as servicio_precio
      FROM citas c
      JOIN usuarios u ON c.usuario_id = u.id
      JOIN vehiculos v ON c.vehiculo_id = v.id
      JOIN servicios s ON c.servicio_id = s.id
      ORDER BY c.fecha DESC
    `);
    return rows;
  },

  findByUserId: async (usuario_id) => {
    const [rows] = await db.execute(`
      SELECT c.*, 
             v.marca as vehiculo_marca, v.modelo as vehiculo_modelo, v.matricula as vehiculo_matricula,
             s.nombre as servicio_nombre, s.precio as servicio_precio
      FROM citas c
      JOIN vehiculos v ON c.vehiculo_id = v.id
      JOIN servicios s ON c.servicio_id = s.id
      WHERE c.usuario_id = ?
      ORDER BY c.fecha DESC
    `, [usuario_id]);
    return rows;
  },

  findById: async (id) => {
    const [rows] = await db.execute('SELECT * FROM citas WHERE id = ?', [id]);
    return rows[0];
  },

  create: async (appointmentData) => {
    const { usuario_id, vehiculo_id, servicio_id, fecha, estado = 'pendiente' } = appointmentData;
    const [result] = await db.execute(
      'INSERT INTO citas (usuario_id, vehiculo_id, servicio_id, fecha, estado) VALUES (?, ?, ?, ?, ?)',
      [usuario_id, vehiculo_id, servicio_id, fecha, estado]
    );
    return result.insertId;
  },

  updateStatus: async (id, estado) => {
    const [result] = await db.execute(
      'UPDATE citas SET estado = ? WHERE id = ?',
      [estado, id]
    );
    return result.affectedRows > 0;
  },

  delete: async (id) => {
    const [result] = await db.execute('DELETE FROM citas WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
};

module.exports = Appointment;
