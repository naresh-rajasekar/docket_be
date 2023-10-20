const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,{
        host : process.env.DB_HOST,
        dialect : 'mysql'
    }
)




var db = {};

Object.values(db).forEach(model => {
    if (model.associate) {
        model.associate(db);
    }
});
// This assumes that your models are defined in the ../models/index.js file,
// and each model file exports a Sequelize model.

// sequelize.sync({ force: false, alter: true });
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;



