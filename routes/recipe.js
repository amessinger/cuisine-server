import { findAll, find, create, update } from '../services/recipe.js';

export default {
  'GET /recipes': async function(req, res) {
    try {
      const result = await findAll();
      res.json(result);  
    } catch (error) {
      console.log(error);
      res.status(500).send('Something broke!');
    }
  },
  'POST /recipes': async function(req, res) {
    try {
      const result = await create(req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send('Something broke!');
    }
  },
  'GET /recipes/:id': async function(req, res) {
    try {
      const result = await find(req.params.id);
      res.json(result);  
    } catch (error) {
      console.log(error);
      res.status(500).send('Something broke!');
    }
  },
  'PUT /recipes/:id': async function(req, res) {
    try {
      const result = await update(req.params.id, req.body);
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(500).send('Something broke!');
    }
  }
};
