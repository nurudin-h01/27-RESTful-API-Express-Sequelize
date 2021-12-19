const express = require("express");
const Sequelize = require("sequelize");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

    
const sequlize = new Sequelize({
    host: "localhost",
    dialect: "mysql",
    database: "animals",
    username: "root",
    password: ""
});

sequlize
    .authenticate()
    .then(() => {
        console.log("connection has been established successfully");
    })
    .then(() => {
        Hewan.sync().then(() => console.log("table Hewan created"));
    })
    .catch((err) => {
        console.log("unable to connect", err);
    });


const Hewan = sequlize.define(
    "hewans", {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        nama: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        namaSpesies: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        umur: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW')
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW')
        }
    }
);


app.get("/hewan", (req, res) => {
    Hewan.findAll()
        .then((result) => {
            res.json({
                message: "OK",
                data: result,
            });
        })
        .catch((error) => res.send(error));
});

app.get("/hewan/:id", (req, res) => {
    Hewan.findOne({
        where: {
            id: req.params.id,
        },
    }).then((result) => {
        res.json({
            message: "OK",
            data: result,
        });
    });
});

app.post("/hewan", (req, res) => {
    const newHewan = {
        nama: req.body["nama"],
        umur: req.body["umur"],
        namaSpesies: req.body["namaSpesies"],
    };
    Hewan.create(newHewan)
        .then((result) => {
            res.json({
                message: "OK",
                data: result
            });
        })
        .catch(error => console.log(error))

})

app.patch("/hewan/:id", (req, res) => {
    const updateHewan = {
        nama: req.body["nama"],
        umur: req.body["umur"],
        namaSpesies: req.body["namaSpesies"],
    };

    Hewan.update(updateHewan, {
            where: {
                id: req.params.id,
            },
        }).then((result) => {
            res.json({
                message: "OK",
                data: result 
            });
        })
        .catch(error => console.log(error))
})

app.delete("/hewan/:id", (req, res) => {
    Hewan.destroy({
            where: {
                id: req.params.id
            }
        }).then((result) => {
            res.json({
                message: "OK",
                data: result,
            });
        })
        .catch(error => console.log(error))
})

app.listen(port, () => {
    console.log(`listening on http://localhost:${port}/`);
});