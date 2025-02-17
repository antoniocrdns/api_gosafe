exports.getVehiculos = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        conn.query('SELECT * FROM Vehiculo', (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            res.status(200).json(results);
        });
    });
};

exports.getVehiculoById = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        conn.query('SELECT * FROM Vehiculo WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            res.status(200).json(results[0]);
        });
    });
};

exports.createVehiculo = (req, res) => {
    const { marca, modelo, numero_taxi, id_conductor } = req.body;

    if (!marca || !modelo || !numero_taxi || !id_conductor) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'INSERT INTO Vehiculo (marca, modelo, numero_taxi, id_conductor, activo) VALUES (?, ?, ?, ?, 1)';
        conn.query(query, [marca, modelo, numero_taxi, id_conductor], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Vehículo creado', id: results.insertId });
        });
    });
};

exports.updateVehiculo = (req, res) => {
    const { id } = req.params;
    const { marca, modelo, numero_taxi, id_conductor, activo } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'UPDATE Vehiculo SET marca = ?, modelo = ?, numero_taxi = ?, id_conductor = ?, activo = ? WHERE id = ?';
        conn.query(query, [marca, modelo, placa, color || null, id_conductor, id], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            res.status(200).json({ message: 'Vehículo actualizado' });
        });
    });
};

/* exports.deleteVehiculo = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        conn.query('DELETE FROM Vehiculo WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Vehículo no encontrado' });
            }
            res.status(200).json({ message: 'Vehículo eliminado' });
        });
    });
}; */
