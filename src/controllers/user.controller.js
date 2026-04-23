const User = require('../models/user.model');
const { sendSuccess } = require('../utils/responseHandler');
const ApiError = require('../utils/errorHandler');

const UserController = {
  getAll: async (req, res, next) => {
    try {
      const users = await User.findAll();
      sendSuccess(res, 200, 'Usuarios obtenidos correctamente', users);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) throw new ApiError(404, 'Usuario no encontrado');
      sendSuccess(res, 200, 'Usuario obtenido correctamente', user);
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      // Un usuario normal solo puede actualizarse a sí mismo (esto podría ir en middleware)
      if (req.user.rol !== 'admin' && req.user.id !== parseInt(req.params.id)) {
        throw new ApiError(403, 'No tienes permiso para actualizar este usuario');
      }

      const updated = await User.update(req.params.id, req.body);
      if (!updated) throw new ApiError(404, 'Usuario no encontrado o sin cambios');
      
      sendSuccess(res, 200, 'Usuario actualizado correctamente');
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const deleted = await User.delete(req.params.id);
      if (!deleted) throw new ApiError(404, 'Usuario no encontrado');
      
      sendSuccess(res, 200, 'Usuario eliminado correctamente');
    } catch (error) {
      next(error);
    }
  }
};

module.exports = UserController;
