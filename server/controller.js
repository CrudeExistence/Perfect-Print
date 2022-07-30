require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


module.exports = {
    getTempInfo: (req, res) => {
        sequelize.query(`SELECT * FROM printing_full;`)
        .then(dbRes => res.status(200).send(dbRes[0]))
        .catch(err => console.log(err))
    },

    // updateTempInfo: (req,res) => {
    //     let {
    //         // plastic_id,
    //         brand,
    //         color,
    //         color_type,
    //         image,
    //         buy_link,
    //         temp_suggested,
    //         temp_lowest,
    //         temp_highest,
    //         temp_best
    //     } = req.body

    //     sequelize.query(`
    //         UPDATE printing_full
    //         SET brand = '${}'`)
    // }

    

}