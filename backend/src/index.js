const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const router = require('./routes/index.routes')

const app = express();

require('./db')

/* SETTINGS */
app.set('port', process.env.PORT || 3000);

/* MIDDLEWARES */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

/* ROUTES */
app.use(router);

/* HANDLING ERRORS */
app.use((err, req, res, next) => {
    return res.status(500).json({
        status: "error",
        message: err.message,
    });
});

app.listen(app.get("port"));
console.log('Server on port ', app.get("port"));