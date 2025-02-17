const express = require('express');
const app = express();
const configureDatabase = require('./config/database');
const cors  = require('cors');

// Middleware
app.use(express.json()); 
app.use(cors());

configureDatabase(app);

// Rutas
const authRoutes = require('./routes/auth.routes');
const vehiculoRoutes = require('./routes/vehiculo.routes');
const viajesPasajeroRoutes = require('./routes/viajesPasajero.routes');
const viajesConductorRoutes = require('./routes/viajesConductor.routes');
const pasajeroRoutes = require('./routes/pasajero.routes');
const conductorRoutes = require('./routes/conductor.routes');

// Uso de rutas
app.use('/api/auth', authRoutes);
app.use('/api', vehiculoRoutes);
app.use('/api', viajesPasajeroRoutes);
app.use('/api', viajesConductorRoutes);
app.use('/api', pasajeroRoutes);
app.use('/api', conductorRoutes);

// Inicializar server
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send(`Servidor corriendo en puerto ${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
