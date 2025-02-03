const express = require('express');
const router = express.Router();
const { loginPasajero, loginConductor, loginAdmin } = require('../controllers/auth.controller');


router.post('/login/pasajero', loginPasajero);
router.post('/login/conductor', loginConductor);
router.post('/login/admin', loginAdmin);

module.exports = router;
