const express = require('express');
const router = express.Router();
const viajesConductorController = require('../controllers/viajesConductor.controller');

router.get('/viajes/conductor', viajesConductorController.getViajesConductor);
router.get('/viajes/conductor/:id', viajesConductorController.getViajeConductorById);
router.post('/viajes/conductor', viajesConductorController.createViajeConductor);

module.exports = router;
