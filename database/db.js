// database connection ko code lekhne
 
 const { Sequelize,DataTypes } = require('sequelize');
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

    const db ={}

    db.blogs =require("./../models/blogModel")(sequelize, DataTypes) // importing blog model and passing sequelize and DataTypes
     db.users=require("./../models/userModel")(sequelize, DataTypes) // importing user model and passing sequelize and DataTypes
    db.products = require("./../models/productModel")(sequelize, DataTypes) // importing product model and passing sequelize and DataTypes
    db.adds= require("./../models/addModel")(sequelize, DataTypes) // importing add model and passing sequelize and DataTypes


    //yesto relation xa vanerw
    db.users.hasMany(db.adds)

    db.adds.belongsTo(db.users)
    
    sequelize.sync({alter: true}) .then(() => {
        console.log("migrated successfully");
    })
    module.exports = sequelize
    module.exports = db // exporting db object which contains all the models
