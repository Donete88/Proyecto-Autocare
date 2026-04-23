const Appointment = require('../models/appointment.model');
const Vehicle = require('../models/vehicle.model');
const { sendSuccess } = require('../utils/responseHandler');
const ApiError = require('../utils/errorHandler');

const AppointmentController = {
  getAll: async (req, res, next) => {
    try {
      let appointments;
      if (req.user.rol === 'admin') {
        appointments = await Appointment.findAll();
      } else {
        appointments = await Appointment.findByUserId(req.user.id);
      }
      sendSuccess(res, 200, 'Citas obtenidas correctamente', appointments);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) throw new ApiError(404, 'Cita no encontrada');
      
      // Validar si pertenece al usuario actual a menos que sea admin
      if (req.user.rol !== 'admin' && appointment.usuario_id !== req.user.id) {
        throw new ApiError(403, 'No tienes permiso para ver esta cita');
      }

      sendSuccess(res, 200, 'Cita obtenida correctamente', appointment);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const usuario_id = req.user.rol === 'admin' ? (req.body.usuario_id || req.user.id) : req.user.id;
      const { vehiculo_id, servicio_id, fecha } = req.body;

      // Verificar que el vehículo pertenece al usuario
      if (req.user.rol !== 'admin') {
        const vehicle = await Vehicle.findById(vehiculo_id);
        if (!vehicle || vehicle.usuario_id !== usuario_id) {
          throw new ApiError(403, 'El vehículo seleccionado no te pertenece');
        }
      }

      const insertId = await Appointment.create({
        usuario_id,
        vehiculo_id,
        servicio_id,
        fecha
      });
      sendSuccess(res, 201, 'Cita creada correctamente', { id: insertId });
    } catch (error) {
      next(error);
    }
  },

  updateStatus: async (req, res, next) => {
    try {
      const { estado } = req.body;
      const updated = await Appointment.updateStatus(req.params.id, estado);
      if (!updated) throw new ApiError(404, 'Cita no encontrada');
      
      sendSuccess(res, 200, 'Estado de la cita actualizado correctamente');
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const appointment = await Appointment.findById(req.params.id);
      if (!appointment) throw new ApiError(404, 'Cita no encontrada');

      if (req.user.rol !== 'admin' && appointment.usuario_id !== req.user.id) {
        throw new ApiError(403, 'No tienes permiso para eliminar esta cita');
      }

      const deleted = await Appointment.delete(req.params.id);
      if (!deleted) throw new ApiError(400, 'No se pudo eliminar la cita');
      
      sendSuccess(res, 200, 'Cita eliminada correctamente');
    } catch (error) {
      next(error);
    }
  }
};

module.exports = AppointmentController;
