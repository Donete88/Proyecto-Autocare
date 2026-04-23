const Service = require('../models/service.model');
const { sendSuccess } = require('../utils/responseHandler');
const ApiError = require('../utils/errorHandler');

const ServiceController = {
  getAll: async (req, res, next) => {
    try {
      const services = await Service.findAll();
      sendSuccess(res, 200, 'Servicios obtenidos correctamente', services);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const service = await Service.findById(req.params.id);
      if (!service) throw new ApiError(404, 'Servicio no encontrado');
      sendSuccess(res, 200, 'Servicio obtenido correctamente', service);
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const insertId = await Service.create(req.body);
      sendSuccess(res, 201, 'Servicio creado correctamente', { id: insertId });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const updated = await Service.update(req.params.id, req.body);
      if (!updated) throw new ApiError(404, 'Servicio no encontrado');
      sendSuccess(res, 200, 'Servicio actualizado correctamente');
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const deleted = await Service.delete(req.params.id);
      if (!deleted) throw new ApiError(404, 'Servicio no encontrado');
      sendSuccess(res, 200, 'Servicio eliminado correctamente');
    } catch (error) {
      next(error);
    }
  }
};

module.exports = ServiceController;
