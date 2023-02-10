const connection = require('../db');

//GET ALL ORDERS
const getAllOrders = async (req, res, next) => {
    try {
        const allOrders = await connection.query("SELECT * from cash_order o inner join customer c on c.id_customer = o.id_customer WHERE o.state = 'I'")
        res.json(allOrders.rows)
    } catch (error) {
        next(error);
    }
}


//ASSIGN MOTORCYCLIST
const assignMotorcyclist = async(req, res, next) => {
    try {
        const {id_order, id_motorcyclist} = req.body;
        const updateOrder = await connection.query("UPDATE cash_order set id_motorcyclist = $1, state = 'P' WHERE id_order = $2", [id_motorcyclist, id_order]);

        res.json({
            message: 'Motorcyclist Assigned'
        })
    } catch (error) {
        next(error)
    }
}

//ADD PAY IN A ORDER
const addPrice = async(req, res, next) => {
    try {
        const {amount, date_pay, id_order} = req.body
        const price = await connection.query("INSERT INTO pay (amount, state, date_pay, id_order) VALUES ($1, 'C', $2, $3)", [amount, date_pay, id_order]);

        res.json({
            message: 'Pay register successfuly'
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllOrders,
    assignMotorcyclist,
    addPrice
};

