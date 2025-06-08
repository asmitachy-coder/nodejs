const { Sequelize, DataTypes } = require("sequelize");

const makeAddTable=(sequelize,DataTypes)=>{
    const add=sequelize.define("adds", {
        task: {
            type: DataTypes.STRING,
        
        },
        description: {
            type: DataTypes.STRING,
    
        },
        date: {
            type: DataTypes.DATEONLY,
           
        }
    });
    return add;
}
module.exports = makeAddTable;