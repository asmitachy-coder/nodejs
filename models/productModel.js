const makeproductTable = (sequelize, DataTypes) => {
    const Product = sequelize.define("product", {
        name: {
            type: DataTypes.STRING,
            
        },
        price: {
            type: DataTypes.FLOAT,
    
        },
        quantity: {
            type: DataTypes.INTEGER,
            
        },
        description: {
            type: DataTypes.STRING,
            
        },
        stock: {
            type: DataTypes.INTEGER,
            
        }
    });
    return Product;
}
module.exports = makeproductTable;