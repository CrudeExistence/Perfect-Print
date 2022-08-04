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


    addNew: (req, res) => {
        let {
            brand,
            color,
            color_type,
            image,
            buy_link,
            temp_suggested,
            temp_lowest,
            temp_highest,
            temp_best
        } = req.body

        sequelize.query(`
        INSERT INTO printing_full 
        (brand, color, color_type, image, buy_link, temp_suggested, temp_lowest, temp_highest, temp_best)
        VALUES ('${brand}', '${color}', '${color_type}', '${image}', '${buy_link}', '${temp_suggested}', ${temp_lowest}, ${temp_highest}, ${temp_best})
        RETURNING *;
        `).then(() => {
            console.log('Added!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding new plastic', err))
    },

    modifyEntry: (req,res) => {
        let {
            id,
            brand,
            color,
            color_type,
            image,
            buy_link,
            temp_suggested,
            temp_lowest,
            temp_highest,
            temp_best
        } = req.body

        id = +id
        temp_lowest = +temp_lowest
        temp_highest = +temp_highest
        temp_best = +temp_best
        
        sequelize.query(`
            UPDATE printing_full
            SET brand = '${brand}',
            color = '${color}',
            color_type = '${color_type}',
            image = '${image}',
            buy_link  = '${buy_link}',
            temp_suggested = '${temp_suggested}',
            temp_lowest = ${temp_lowest},
            temp_highest = ${temp_highest},
            temp_best = ${temp_best}
            WHERE plastic_id = ${id};
            `)
            .then(() => {
                console.log('Edited!')
                res.sendStatus(200)
            })
            .catch(err => console.log('error updating', err))
    },

    deleteEntry: (req, res) => {
        let { id } = req.params
        console.log(id)
        id = +id
        sequelize.query(`
        DELETE FROM printing_full WHERE plastic_id = ${id}
        `).then(() => {
            console.log('Deleted!')
            res.sendStatus(200)
        }).catch(err => console.log('error deleting plastic', err))
    }
    

}