const { Router } = require("express");
const {
    createOrder,
    createCustomer
} = require("../controller/customer.controller");
const {
    getAllOrders,
    assignMotorcyclist,
    addPrice
} = require("../controller/employee.controller");
const {
    ordersAssigned,
    updateOrder
} = require("../controller/motorcyclist.controller");
const {
    login
} = require("../controller/login.controller")

const router = Router();


//GET REQUESTS
router.get('/:username/:password', login);
router.get('/allorder', getAllOrders);
router.get('/:id_motorcyclist', ordersAssigned);

//POST REQUEST
router.post('/order', createOrder);
router.post('/customer', createCustomer);
router.post('/pay', addPrice)

//PUT REQUESTS
router.put('/assign', assignMotorcyclist);
router.put('/update/:id_order', updateOrder);

module.exports = router;