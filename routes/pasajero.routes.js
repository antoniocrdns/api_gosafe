const express = require('express');
const router = express.Router();
const pasajeroController = require('../controllers/pasajero.controller');

router.get('/pasajeros', pasajeroController.getAllPasajeros);
router.get('/pasajeros/:id', pasajeroController.getPasajeroById);
router.post('/pasajeros', pasajeroController.createPasajero);
router.put('/pasajeros/:id', pasajeroController.updatePasajero);
router.put('/pasajeros/password/:id', pasajeroController.updatePasajeroPassword);

module.exports = router;
