var express = require('express');
var router = express.Router();
const multer = require('multer');
const csv = require('fast-csv');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {handleImportCSV, handleAddDocket, handleGetAllSuppliers, 
  handleGetPOBySupplierName, handleGetAllDocket} = require('../controllers/index')

router.post('/import-csv',upload.single('csvFile'), handleImportCSV)


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    message : "Docket works"
  })
});



router.post('/addDocket', handleAddDocket )
router.get('/getSuppliers', handleGetAllSuppliers)
router.post('/orders', handleGetPOBySupplierName)
router.get('/getDockets', handleGetAllDocket)

module.exports = router;
