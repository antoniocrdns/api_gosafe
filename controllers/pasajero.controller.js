exports.getAllPasajeros = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        conn.query('SELECT * FROM Pasajero', (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            res.status(200).json(results);
        });
    });
};

exports.getPasajeroById = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        conn.query('SELECT * FROM Pasajero WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Pasajero no encontrado' });
            }
            res.status(200).json(results[0]);
        });
    });
};

exports.createPasajero = (req, res) => {
    const { nombre_completo, correo, telefono, contraseña } = req.body;

    if (!nombre_completo || !correo || !telefono || !contraseña) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'INSERT INTO Pasajero (nombre_completo, correo, telefono, contraseña, rol) VALUES (?, ?, ?, ?, ?)';
        conn.query(query, [nombre_completo, correo, telefono, contraseña, 1], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Pasajero creado', id: results.insertId });
        });
    });
};


exports.updatePasajero = (req, res) => {
    const { id } = req.params;
    const { nombre_completo, correo, telefono, contraseña } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'UPDATE Pasajero SET nombre_completo = ?, correo = ?, telefono = ?, contraseña = ? WHERE id = ?';
        conn.query(query, [nombre_completo, correo, telefono, contraseña, id], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Pasajero no encontrado' });
            }
            res.status(200).json({ message: 'Pasajero actualizado' });
        });
    });
};
