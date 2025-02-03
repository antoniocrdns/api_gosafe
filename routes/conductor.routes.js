const express = require('express');
const router = express.Router();
const conductorController = require('../controllers/conductor.controller');

router.get('/conductores', conductorController.getAllConductores);
router.get('/conductores/:id', conductorController.getConductorById);
router.post('/conductores', conductorController.createConductor);
router.put('/conductores/:id', conductorController.updateConductor);

module.exports = router;
