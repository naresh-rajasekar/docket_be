const { DataTypes } = require('sequelize');
const db = require('./index'); // Update this with your actual database configuration
const sequelize = db.sequelize
const Order = sequelize.define('orders', {
  recordType: {
    type: DataTypes.STRING,
    field: 'Record Type',
  },
  poNumber: {
    type: DataTypes.STRING,
    field: 'PO Number',
  },
  poNumber2: {
    type: DataTypes.STRING,
    field: 'PO Number_2',
  },
  poNumber3: {
    type: DataTypes.STRING,
    field: 'PO Number_3',
  },
  chg: DataTypes.STRING,
  com: DataTypes.STRING,
  type: DataTypes.STRING,
  conf: DataTypes.STRING,
  orderDate: {
    type: DataTypes.STRING,
    field: 'Order Date',
  },
  buyer: DataTypes.STRING,
  accountNumber: {
    type: DataTypes.STRING,
    field: 'Account Number',
  },
  supplier: DataTypes.STRING,
  curr: DataTypes.STRING,
  item: DataTypes.STRING,
  commodityCode: {
    type: DataTypes.STRING,
    field: 'Commodity Code',
  },
  description: DataTypes.STRING,
  qty: DataTypes.STRING,
  un: DataTypes.STRING,
  orderValue: {
    type: DataTypes.STRING,
    field: 'Order Value',
  },
  amountInvoiced: {
    type: DataTypes.STRING,
    field: 'Amount Invoiced',
  },
  wbsCode: {
    type: DataTypes.STRING,
    field: 'WBS Code',
  },
  contract: DataTypes.STRING,
  remarks: DataTypes.STRING,
},{
  tableName : 'orders'
});



module.exports = Order;
