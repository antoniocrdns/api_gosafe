const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculo.controller');

router.get('/vehiculos', vehiculoController.getVehiculos);
router.get('/vehiculos/:id', vehiculoController.getVehiculoById);
router.post('/vehiculos', vehiculoController.createVehiculo);
router.put('/vehiculos/:id', vehiculoController.updateVehiculo);
// router.delete('/vehiculos/:id', vehiculoController.deleteVehiculo);
router.get('/vehiculos/id_conductor/:numero_taxi', vehiculoController.getIdConductorByCodigo);

module.exports = router;
