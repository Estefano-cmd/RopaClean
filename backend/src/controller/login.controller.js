const connection = require('../db');

const login = async (req, res, next) => {
    try {
        const { username, password } = req.params;
        console.log(req.params)
        const session = await connection.query('SELECT * FROM login WHERE username = $1 AND password = $2', [username, password]);
        if(session.rowCount > 0){
            if(session.rows[0].id_rol == 1){
                const customer = await connection.query('SELECT * FROM customer c inner join login l on l.id_user = c.id_user WHERE c.id_user = $1', [session.rows[0].id_user]);
                res.json(customer.rows[0]);
            }
            if(session.rows[0].id_rol == 2){
                const customer = await connection.query('SELECT * FROM employee e inner join login l on e.id_user = l.id_user WHERE e.id_user = $1', [session.rows[0].id_user]);
                res.json(customer.rows[0]);
            }
            if(session.rows[0].id_rol == 4){
                const customer = await connection.query('SELECT * FROM motorcyclist m inner join login l on l.id_user = m.id_user WHERE m.id_user = $1', [session.rows[0].id_user]);
                res.json(customer.rows[0]);
            }

            //res.json(session.rows[0])
        }
        else{
            res.json({
                message: 'Invalid User'
            })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    login
};