exports.getAllConductores = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        conn.query('SELECT * FROM Conductor', (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            res.status(200).json(results);
        });
    });
};

exports.getConductorById = (req, res) => {
    const { id } = req.params;
    
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        conn.query('SELECT * FROM Conductor WHERE id = ?', [id], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Conductor no encontrado' });
            }
            res.status(200).json(results[0]);
        });
    });
};

exports.createConductor = (req, res) => {
    const { nombre_completo, correo, telefono, contraseña } = req.body;

    if (!nombre_completo || !correo || !telefono || !contraseña) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'INSERT INTO Conductor (nombre_completo, correo, telefono, contraseña, rol) VALUES (?, ?, ?, ?, ?)';
        conn.query(query, [nombre_completo, correo, telefono, contraseña, 2], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            res.status(201).json({ message: 'Conductor creado', id: results.insertId });
        });
    });
};


exports.updateConductor = (req, res) => {
    const { id } = req.params;
    const { nombre_completo, correo, telefono, contraseña } = req.body;

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'UPDATE Conductor SET nombre_completo = ?, correo = ?, telefono = ?, contraseña = ? WHERE id = ?';
        conn.query(query, [nombre_completo, correo, telefono, contraseña, id], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Conductor no encontrado' });
            }
            res.status(200).json({ message: 'Conductor actualizado' });
        });
    });
};
