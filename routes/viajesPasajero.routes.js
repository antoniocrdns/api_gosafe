const express = require('express');
const router = express.Router();
const viajesPasajeroController = require('../controllers/viajesPasajero.controller');

router.get('/viajes/pasajero', viajesPasajeroController.getViajesPasajero);
router.get('/viajes/pasajero/:id_pasajero', viajesPasajeroController.getViajePasajeroById);
router.post('/viajes/pasajero', viajesPasajeroController.createViajePasajero);

module.exports = router;
