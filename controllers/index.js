const csv = require('fast-csv');
const Order = require('../models/po');
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const Docket = require('../models/docket');

const handleImportCSV = (req, res) =>{
    try{
        const fileBuffer = req.file.buffer.toString();
  const data = [];

  csv.parseString(fileBuffer, { headers:  headers => {

    // rename duplicate
    headers.map((el, i, ar) => {
        if (ar.indexOf(el) !== i) {
            headers[i] = `${el}_${i}`;
        }
    });

    return headers;
}
}) 
.on('data', async (row) => {
    try {
      // Create an instance of the Order model for each row
      const orderInstance = await Order.create({
        recordType: row['Record Type'],
        poNumber: row['PO Number'],
        poNumber_1: row['PO Number_1'],
        poNumber_2: row['PO Number_2'],
        chg : row['Chg'],
        com : row['Com'],
        type : row['Type'],
        conf : row['Conf'],
        orderDate : row['Order Date'],
        buyer: row['Buyer'],
        accountNumber : row['Account Number'],
        supplier : row['Supplier'],
        curr : row['Curr'],
        item : row['Item'],
        commodityCode : row['Commodity Code'],
        description : row['Description'],
        un : row['Un'],
        orderValue : row['Order Value'],
        amountInvoiced : row['Amount Invoiced'],
        wbsCode : row['WBS Code'],
        contract : row['Contract'],
        remarks : row['Remarks']      
      });
      await orderInstance.save();
      data.push(orderInstance);
    } catch (error) {
        console.error('Error creating/orderInstance:', error);
        res.status(500).send('Internal Server Error');
      }
    })
    .on('end', () => {
      res.send('Data imported successfully');
    });
} catch (error) {
  console.error(error);
  res.status(500).send('Internal Server Error');
}

}


  
const handleGetAllSuppliers = async(req, res) =>{
    try{
        const suppliersObj =  await sequelize.query(`
        select distinct supplier from orders where supplier <> '';
        `,
        {type : QueryTypes.SELECT})

        
        const suppliers = suppliersObj.map(item => item.supplier);

        
        res.status(200).send({
            statusCode : 200,
            message : "Data Retrieved Successfully",
            suppliers: suppliers
        })
    }catch(error){
        console.log(error);
    }
}

const handleGetPOBySupplierName =async (req, res) =>{
    try{
        let supplier = req.body.supplier
        let POList = await sequelize.query(`
        SELECT \`PO Number\`, description FROM orders WHERE supplier = '${supplier}'
        `,{
            type : QueryTypes.SELECT
        })
     
        let ordersList = POList.map((order) => order['PO Number'])
        res.status(200).send({
            statusCode : 200,
            message : "Data Retrieved Successfully",
            orders : ordersList,
            POList : POList
        })
    }catch(error){
        console.log(error)
    }
}


const handleAddDocket = async(req, res) =>{
    try{
        const purchaseOrder = await sequelize.query(`
        select * from orders where supplier = '${req.body.supplier}' and \`PO Number\` = '${req.body.poNumber}'
        `,
        {
            type: QueryTypes.SELECT
        })
        const docketInstance = await Docket.create({
            docketName : req.body.docketName,
            startTime : req.body.startTime,
            endTime : req.body.endTime,
            noOfHours : req.body.noOfHours ,
            ratePerHour : req.body.ratePerHour ,
            supplier : req.body.supplier,
            poNumber :  req.body.poNumber,
            poDescription : req.body.poDescription,
            purchaseOrder : purchaseOrder[0]
        })

        await docketInstance.save();
        res.status(200).send({
            statusCode : 200,
            message : "Docket Created Successfully"
        })
    }catch(error){
        console.log(error);
    }
}
const handleGetAllDocket= async(req, res) =>{
    try{
        let docketList = await sequelize.query(`
        select * from dockettbl
        `,
        {type : QueryTypes.SELECT})

        res.send({
            statusCode : 200,
            docketList : docketList
        })
    }catch(error){
        console.log(error)
    }
}
module.exports = {
    handleImportCSV,
    handleAddDocket,
    handleGetAllSuppliers,
    handleGetPOBySupplierName,
    handleGetAllDocket
}
