const Vehicle = require('../models/vehicle.model');
const { sendSuccess } = require('../utils/responseHandler');
const ApiError = require('../utils/errorHandler');

const VehicleController = {
  getAll: async (req, res, next) => {
    try {
      // Si es admin, ve todos. Si es cliente, solo los suyos.
      let vehicles;
      if (req.user.rol === 'admin') {
        vehicles = await Vehicle.findAll();
      } else {
        vehicles = await Vehicle.findByUserId(req.user.id);
      }
      sendSuccess(res, 200, 'Vehículos obtenidos correctamente', vehicles);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) throw new ApiError(404, 'Vehículo no encontrado');
      
      // Seguridad: Solo el dueño o un admin pueden verlo
      if (req.user.rol !== 'admin' && vehicle.usuario_id !== req.user.id) {
        throw new ApiError(403, 'No tienes permiso para ver este vehículo');
      }

      sendSuccess(res, 200, 'Vehículo obtenido correctamente', vehicle);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      // Asegurarse de que el usuario_id es el del token o el provisto por admin
      const usuario_id = req.user.rol === 'admin' ? (req.body.usuario_id || req.user.id) : req.user.id;
      
      const insertId = await Vehicle.create({
        ...req.body,
        usuario_id
      });
      
      sendSuccess(res, 201, 'Vehículo creado correctamente', { id: insertId });
    } catch (error) {
      // Manejar error de matrícula duplicada
      if (error.code === 'ER_DUP_ENTRY') {
        next(new ApiError(400, 'La matrícula ya está registrada'));
      } else {
        next(error);
      }
    }
  },

  update: async (req, res, next) => {
    try {
      // Comprobar pertenencia antes de actualizar
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) throw new ApiError(404, 'Vehículo no encontrado');
      
      if (req.user.rol !== 'admin' && vehicle.usuario_id !== req.user.id) {
        throw new ApiError(403, 'No tienes permiso para actualizar este vehículo');
      }

      const updated = await Vehicle.update(req.params.id, req.body);
      if (!updated) throw new ApiError(400, 'No se pudo actualizar el vehículo');
      
      sendSuccess(res, 200, 'Vehículo actualizado correctamente');
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        next(new ApiError(400, 'La matrícula ya está registrada por otro vehículo'));
      } else {
        next(error);
      }
    }
  },

  delete: async (req, res, next) => {
    try {
      const vehicle = await Vehicle.findById(req.params.id);
      if (!vehicle) throw new ApiError(404, 'Vehículo no encontrado');
      
      if (req.user.rol !== 'admin' && vehicle.usuario_id !== req.user.id) {
        throw new ApiError(403, 'No tienes permiso para eliminar este vehículo');
      }

      const deleted = await Vehicle.delete(req.params.id);
      if (!deleted) throw new ApiError(400, 'No se pudo eliminar el vehículo');
      
      sendSuccess(res, 200, 'Vehículo eliminado correctamente');
    } catch (error) {
      next(error);
    }
  }
};

module.exports = VehicleController;
