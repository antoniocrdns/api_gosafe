exports.getViajesPasajero = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        conn.query('SELECT * FROM Viajes_pasajero', (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            res.status(200).json(results);
        });
    });
};

exports.getViajePasajeroById = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        conn.query('SELECT * FROM Viajes_pasajero WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Viaje no encontrado' });
            }
            res.status(200).json(results[0]);
        });
    });
};

exports.createViajePasajero = (req, res) => {
    const { direccion_inicio, direccion_fin, tiempo_viaje, distancia_km, id_pasajero } = req.body;

    if (!direccion_inicio || !direccion_fin || !id_pasajero) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'INSERT INTO Viajes_pasajero (direccion_inicio, direccion_fin, tiempo_viaje, distancia_km, id_pasajero) VALUES (?, ?, ?, ?, ?)';
        conn.query(query, [direccion_inicio, direccion_fin, tiempo_viaje || null, distancia_km || null, id_pasajero], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Viaje creado', id: results.insertId });
        });
    });
};
