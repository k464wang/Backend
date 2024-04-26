const express = require('express');
const mysql = require('mysql');
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "doorhan_assign",
    password: "test123",
    database : "doorhanproj"
})

app.get('/', (req,res)=> {
    return res.json("backend from")
})

app.get('/users', (req, res)=> {
    const sql = "SELECT * FROM users";
    db.query(sql, (err,data) =>{
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post('/login', (req, res)=> {
    console.log(req.body);
    const sql = "SELECT * FROM users WHERE `country` = ? AND `mail` = ? AND `password` = ?";
    db.query(sql, [req.body.country, req.body.mail, req.body.password], (err, data) => {
        console.log(data);
        if (err) {
            return res.json("Error");
        }
        if (data.length > 0){
            return res.json(data);
        } else {
            return res.json("Failure");
        }
    })
})

app.post('/addDevice', (req, res)=> {
    console.log(req.body);
    const sql = "INSERT INTO `users` (`id`, `country`, `mail`, `password`, `Device`) VALUES (?)"
    db.query(sql, [[req.body.id, req.body.country, req.body.mail, req.body.password, req.body.Device]], (err, data) => {
        console.log(err);
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})

app.listen(8081, () => {
    console.log("listening");
})
