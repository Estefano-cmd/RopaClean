const { Pool } = require('pg');
const { db } = require("./config");

const connection = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database,
    ssl: {
        rejectUnauthorized: false
    }
});

connection.connect(function(err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('DataBase is connected');
    }
})

module.exports = connection;