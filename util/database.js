const {Sequelize }= require('sequelize')
const mysql=require('mysql2')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'backend',
    password: 'Hrishi@123'
});

const sequelize = new Sequelize('backend', 'root', 'Hrishi@123',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;