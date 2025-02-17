exports.loginPasajero = (req, res) => {
    const { correo, contraseña } = req.body;
    console.log('Datos recibidos (Pasajero):', correo, contraseña);

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'SELECT * FROM Pasajero WHERE correo = ? AND contraseña = ? AND activo = 1';
        conn.query(query, [correo, contraseña], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }

            const user = results[0];
            res.status(200).json({
                message: 'Login exitoso',
                user: {
                    id: user.id,
                    nombre: user.nombre_completo,
                    correo: user.correo,
                    rol_id: user.rol
                }
            });
        });
    });
};

exports.loginConductor = (req, res) => {
    const { correo, contraseña } = req.body;
    console.log('Datos recibidos (Conductor):', correo, contraseña);

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'SELECT * FROM Conductor WHERE correo = ? AND contraseña = ?';
        conn.query(query, [correo, contraseña], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }

            const user = results[0];
            res.status(200).json({
                message: 'Login exitoso',
                user: {
                    id: user.id,
                    nombre: user.nombre_completo,
                    correo: user.correo,
                    rol_id: user.rol
                }
            });
        });
    });
};

exports.loginAdmin = (req, res) => {
    const { correo, contraseña } = req.body;
    console.log('Datos recibidos (Administrador):', correo, contraseña);

    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión:', err);
            return res.status(500).json({ error: 'Error de conexión' });
        }

        const query = 'SELECT * FROM Administrador WHERE correo = ? AND contraseña = ?';
        conn.query(query, [correo, contraseña], (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                return res.status(500).json({ error: err });
            }

            if (results.length === 0) {
                return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
            }

            const user = results[0];
            res.status(200).json({
                message: 'Login exitoso',
                user: {
                    id: user.id,
                    nombre: user.nombre_completo,
                    correo: user.correo,
                    rol_id: user.rol
                }
            });
        });
    });
};