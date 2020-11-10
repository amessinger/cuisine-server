import { findAll, find, create, update } from '../services/recipe.js';
import { handleErrorResponse } from '../utils/routes.js';

export default {
  'GET /recipes': async function(req, res) {
    try {
      const result = await findAll();
      res.json(result);  
    } catch (error) {
      console.log(error);
      handleErrorResponse(error, res);
    }
  },
  'POST /recipes': async function(req, res) {
    try {
      const result = await create(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
      handleErrorResponse(error, res);
    }
  },
  'GET /recipes/:id': async function(req, res) {
    try {
      const result = await find(req.params.id);
      res.json(result);  
    } catch (error) {
      handleErrorResponse(error, res);
    }
  },
  'PUT /recipes/:id': async function(req, res) {
    try {
      const result = await update(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      handleErrorResponse(error, res);
    }
  }
};
