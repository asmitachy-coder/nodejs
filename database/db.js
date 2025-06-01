// database connection ko code lekhne
 
 const { Sequelize } = require('sequelize');
 require("dotenv").config() // importing dotenv to use environment variables

 const sequelize = new Sequelize({
    
    database :process.env.database_name, // database name
    username: process.env.database_username, // database username
    port: process.env.database_port, // database port
    host: process.env.database_host, // database host
    dialect : "mysql",
    password: process.env.database_password, 
 }) // making object from sequelize class
// sequelize connect huna try garr vanwra

 sequelize.authenticate()
 .then(() => {
     console.log("connected sucessfully");

 })
    .catch((err) => {
        console.log("Error aayo", err);
    });
    module.exports = sequelize;
