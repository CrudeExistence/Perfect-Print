require('dotenv').config()
const Sequelize = require('sequelize')

const {CONNECTION_STRING} = process.env

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})


module.exports = {
    seed: (req,res) => {
        sequelize.query(`
        DROP TABLE IF EXISTS temp_table;
        DROP TABLE IF EXISTS printing_deets;

        CREATE TABLE printing_deets (
            plastic_id SERIAL PRIMARY KEY,
            brand varchar(50),
            color varchar(100),
            color_type varchar(100),
            image TEXT,
            buy_link TEXT
        );

        CREATE TABLE temp_table (
            temp_id SERIAL PRIMARY KEY,
            plastic_id INT REFERENCES printing_deets(plastic_id),
            temp_suggested VARCHAR(20),
            temp_lowest FLOAT,
            temp_highest FLOAT,
            temp_best FLOAT
        );

        INSERT INTO printing_deets (brand, color, color_type, image, buy_link)
        VALUES ('Overture', 'Space Gray', 'Smooth', 'https://m.media-amazon.com/images/I/713YA3UkhaL._SL1500_.jpg', 'https://www.amazon.com/OVERTURE-Filament-Consumables-Dimensional-Accuracy/dp/B07PFS2R12/ref=sxin_17?asc_contentid=amzn1.osa.8d9204fa-90b8-47d4-9458-a31da979732c.ATVPDKIKX0DER.en_US&asc_contenttype=article&ascsubtag=amzn1.osa.8d9204fa-90b8-47d4-9458-a31da979732c.ATVPDKIKX0DER.en_US&content-id=amzn1.sym.ffca0e99-1b23-4a12-8f5a-8e5a3b426a13%3Aamzn1.sym.ffca0e99-1b23-4a12-8f5a-8e5a3b426a13&creativeASIN=B07PFS2R12&crid=1P5IK2EXKC645&cv_ct_cx=PLA&cv_ct_id=amzn1.osa.8d9204fa-90b8-47d4-9458-a31da979732c.ATVPDKIKX0DER.en_US&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-pecos-desktop&keywords=PLA&linkCode=oas&pd_rd_i=B07PFS2R12&pd_rd_r=9b01c3bc-0808-464a-bed3-be35da48157f&pd_rd_w=ntx60&pd_rd_wg=mTpJ9&pf_rd_p=ffca0e99-1b23-4a12-8f5a-8e5a3b426a13&pf_rd_r=J6AV0PB7CPDGNGANB56F&qid=1659033132&sprefix=pla%2Caps%2C232&sr=1-1-c26ac7f6-b43f-4741-a772-17cad7536576&tag=the-angle-20'),
        ('Overture', 'Black', 'Smooth', 'https://m.media-amazon.com/images/I/71Q2oJkncEL._SL1500_.jpg', 'https://www.amazon.com/OVERTURE-Filament-Consumables-Dimensional-Accuracy/dp/B07PGY2JP1/ref=sr_1_4?crid=1P5IK2EXKC645&keywords=PLA&qid=1659033132&sprefix=pla%2Caps%2C232&sr=8-4'),
        ('Amazon Basics', 'Blue', 'Smooth', 'https://m.media-amazon.com/images/I/81v9VRr-gUL._SL1500_.jpg', 'https://www.amazon.com/dp/B07SZLZG26?psc=1&ref=ppx_yo2ov_dt_b_product_details'),
        ('Overture', 'Matte White', 'Matte', 'https://m.media-amazon.com/images/I/71AipVo0-mL._SL1500_.jpg', 'https://www.amazon.com/OVERTURE-Filament-Printer-Dimensional-Accuracy/dp/B089S1HB8K/ref=sr_1_6?crid=1P5IK2EXKC645&keywords=PLA&qid=1659033132&sprefix=pla%2Caps%2C232&sr=8-6'),
        ('Overture', 'Digital Blue Plus', 'Smooth', 'https://m.media-amazon.com/images/I/715jYU6DZDL._SL1500_.jpg', 'https://www.amazon.com/Overture-Filament-Professional-Toughness-Dimensional/dp/B07VCPK9KC/ref=sr_1_2_sspa?crid=3IN1GJQU0EXS1&keywords=overture%2BPLA&qid=1659037696&sprefix=overture%2Bpla%2Caps%2C167&sr=8-2-spons&th=1');

        INSERT INTO temp_table (temp_suggested, temp_lowest, temp_highest, temp_best)
        VALUES ('190-220', 195, 225, 215),
        ('190-220', 196, 223, 217),
        ('190-220', 200, 225, 214),
        ('190-220', 198, 225, 218),
        ('190-220', 192, 224, 215);
        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('Error sending DB', err))


    }
}

// CREATE TABLE printing_full (
//     plastic_id SERIAL PRIMARY KEY,
//     brand varchar(50),
//     color varchar(100),
//     color_type varchar(100),
//     image TEXT,
//     buy_link TEXT,
//     temp_suggested VARCHAR(20),
//     temp_lowest FLOAT,
//     temp_highest FLOAT,
//     temp_best FLOAT
// );

// INSERT INTO printing_full (brand, color, color_type, image, buy_link, temp_suggested, temp_lowest, temp_highest, temp_best)
// VALUES ('Overture', 'Space Gray', 'Smooth', 'https://m.media-amazon.com/images/I/713YA3UkhaL._SL1500_.jpg', 'https://www.amazon.com/OVERTURE-Filament-Consumables-Dimensional-Accuracy/dp/B07PFS2R12/ref=sxin_17?asc_contentid=amzn1.osa.8d9204fa-90b8-47d4-9458-a31da979732c.ATVPDKIKX0DER.en_US&asc_contenttype=article&ascsubtag=amzn1.osa.8d9204fa-90b8-47d4-9458-a31da979732c.ATVPDKIKX0DER.en_US&content-id=amzn1.sym.ffca0e99-1b23-4a12-8f5a-8e5a3b426a13%3Aamzn1.sym.ffca0e99-1b23-4a12-8f5a-8e5a3b426a13&creativeASIN=B07PFS2R12&crid=1P5IK2EXKC645&cv_ct_cx=PLA&cv_ct_id=amzn1.osa.8d9204fa-90b8-47d4-9458-a31da979732c.ATVPDKIKX0DER.en_US&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-pecos-desktop&keywords=PLA&linkCode=oas&pd_rd_i=B07PFS2R12&pd_rd_r=9b01c3bc-0808-464a-bed3-be35da48157f&pd_rd_w=ntx60&pd_rd_wg=mTpJ9&pf_rd_p=ffca0e99-1b23-4a12-8f5a-8e5a3b426a13&pf_rd_r=J6AV0PB7CPDGNGANB56F&qid=1659033132&sprefix=pla%2Caps%2C232&sr=1-1-c26ac7f6-b43f-4741-a772-17cad7536576&tag=the-angle-20', '190-220', 195, 225, 215),
// ('Overture', 'Black', 'Smooth', 'https://m.media-amazon.com/images/I/71Q2oJkncEL._SL1500_.jpg', 'https://www.amazon.com/OVERTURE-Filament-Consumables-Dimensional-Accuracy/dp/B07PGY2JP1/ref=sr_1_4?crid=1P5IK2EXKC645&keywords=PLA&qid=1659033132&sprefix=pla%2Caps%2C232&sr=8-4', '190-220', 196, 223, 217),
// ('Amazon Basics', 'Blue', 'Smooth', 'https://m.media-amazon.com/images/I/81v9VRr-gUL._SL1500_.jpg', 'https://www.amazon.com/dp/B07SZLZG26?psc=1&ref=ppx_yo2ov_dt_b_product_details', '190-220', 200, 225, 214),
// ('Overture', 'Matte White', 'Matte', 'https://m.media-amazon.com/images/I/71AipVo0-mL._SL1500_.jpg', 'https://www.amazon.com/OVERTURE-Filament-Printer-Dimensional-Accuracy/dp/B089S1HB8K/ref=sr_1_6?crid=1P5IK2EXKC645&keywords=PLA&qid=1659033132&sprefix=pla%2Caps%2C232&sr=8-6', '190-220', 198, 225, 218),
// ('Overture', 'Digital Blue Plus', 'Smooth', 'https://m.media-amazon.com/images/I/715jYU6DZDL._SL1500_.jpg', 'https://www.amazon.com/Overture-Filament-Professional-Toughness-Dimensional/dp/B07VCPK9KC/ref=sr_1_2_sspa?crid=3IN1GJQU0EXS1&keywords=overture%2BPLA&qid=1659037696&sprefix=overture%2Bpla%2Caps%2C167&sr=8-2-spons&th=1', '190-220', 192, 224, 215);

