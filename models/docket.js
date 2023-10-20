const { DataTypes } = require('sequelize');
const db = require('./index'); // Update this with your actual database configuration
const sequelize = db.sequelize

const Docket = sequelize.define('dockettbl', {
    docketName : DataTypes.TEXT,
    startTime : DataTypes.TIME,
    endTime : DataTypes.TIME,
    noOfHours : DataTypes.STRING,
    ratePerHour : DataTypes.STRING,
    supplier : DataTypes.STRING,
    poNumber : DataTypes.STRING,
    poDescription : DataTypes.STRING,
    purchaseOrder: {
        type: DataTypes.JSON, // Use DataTypes.JSON for an object structure
        defaultValue: {} // Optional, provide a default value if needed
    }
}, {
    tableName : 'dockettbl'
})

sequelize.sync().then(() => {
    console.log('Database synced');
  }).catch(err => {
    console.error('Error syncing database:', err);
  });
module.exports = Docket;