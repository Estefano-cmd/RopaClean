const connection = require('../db');

//CREATE ORDER
const createOrder = async (req, res, next) => {
    try {
        const {order_date, detail_order, id_customer} = req.body;
        const order = await connection.query("INSERT INTO cash_order (order_date, detail_order, state, id_customer, id_motorcyclist) VALUES ($1, $2, 'I', $3, 1) RETURNING *",
        [order_date, detail_order, id_customer]);

        res.json(order.rows[0]);
    } catch (error) {
        next(error)
    }
}

//CREATE CUSTOMER
const createCustomer = async (req, res, next) => {
    try {
        const {name, surname, phone, ci, username, password, detail_position, position} = req.body;
        const userExist = await connection.query('SELECT * from login WHERE username = $1', [username]);
        const customerExist = await connection.query('SELECT * from customer WHERE ci = $1', [ci]);

        if(userExist.rowCount > 0 && customerExist.rowCount >0){
            return res.json('User Already')
        }
        else{
            const addUser = await connection.query('INSERT INTO login (username, password, state, id_rol) VALUES ($1, $2, true, 1) RETURNING *',
            [username, password]);
            const addCustomer = await connection.query('INSER INTO customer (name, surname, phone, ci, id_user) VALUES ($1, $2, $3, $4, $5) RETURNING *', 
            [name, surname, phone, ci, addUser.rows[0].id_user]);
            const addCoord = await connection.query('INSERT INTO coord (detail_position, position, id_customer) VALUES ($1, $2, $3) RETURNING *',
            [detail_position, position, addCustomer.rows[0].id_customer]);

            res.json({
                message: 'Customer Created Successfully'
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createOrder,
    createCustomer
};