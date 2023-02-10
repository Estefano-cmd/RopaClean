const connection = require('../db');

//VIEW ALL ORDERS ASSIGNED
const ordersAssigned = async (req, res, next) => {
    try {
        const { id_motorcyclist } = req.params;

        const getAssign = await connection.query("SELECT * from cash_order o inner join customer c on o.id_customer = c.id_customer inner join coord co on co.id_customer = c.id_customer WHERE o.id_motorcyclist = $1 AND o.state = 'P'", [id_motorcyclist]);
        res.json(getAssign.rows);
    } catch (error) {
        next(error);
    }
}

//UPDATE ORDER
const updateOrder = async (req, res, next) => {
    try {
        const { id_order } = req.params

        const order = await connection.query('SELECT * from cash_order WHERE id_order = $1', [id_order]);
        if(order.rows[0].state == 'I'){
            const updateIni = await connection.query('UPDATE cash_order set state = P WHERE id_order = $1', [id_order]);
            res.json({
                message: 'Status Changed to "In Process"'
            });
        }
        if(order.rows[0].state == 'P'){
            const updatePro = await connection.query('UPDATE cash_order set state = F WHERE id_order = $1', [id_order]);
            res.json({
                message: 'Status Changed to "Finished"'
            })
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    ordersAssigned,
    updateOrder
};