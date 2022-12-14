const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"password",
    database:"reflectionsdatabase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
/*app.use('/AccountPage',(req,res)=>{
    res.send({
        token:'test123'
    });
});*/

app.get('/api/get', (req,res)=>{
    const sqlSelect = "SELECT * FROM reflections";
    db.query(sqlSelect, (err, result)=>
        res.send(result));
})

//temporary user data request method
app.post('/api/users',(req,res)=>{
    const email = req.body.email
    const password = req.body.pw
    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?",
        [email,password],
        (err, result)=>{
            if(err){
                res.send({err:err});
            }
            if(result.length >0){
                res.send(result);
            }
            else{
                res.send({message: "Wrong username/password"});
            }

    });
});


app.delete('/api/delete/:idreflections',(req,res)=>{
    //const id = "SELECT FROM reflections WHERE idreflections ="
    const refID = req.params.idreflections;
    const sqlDelete = "DELETE FROM reflections WHERE idreflections = ?";

    db.query(sqlDelete, refID, (err,result)=>{
        console.log(err);
        console.log(result)
    }
    )
})

app.post("/api/insert",(req, res)=>{
    //the consts take the variable names as theyre listed in AddReflection.js
    const dates = req.body.day;
    const dayScore = req.body.dayScore;
    const productivityScore = req.body.productivity;
    const notes = req.body.notes;

    const sqlInsert = "INSERT INTO reflections ( dates, dayScore, productivityScore, notes) VALUES (?, ?, ?, ?);";


    db.query(sqlInsert,[dates, dayScore, productivityScore, notes],(err, result)=>{
        console.log(err);
        console.log(result);
    })
})

app.listen(5002, ()=>{
    console.log("running on port 5002");
})

