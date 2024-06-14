const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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
        res.json(result));
})

app.get('api/getDataByUser,', (req, res)=>{
    userid = req.body.userid
    db.query(
        "SELECT * FROM reflections WHERE idusers = ?",
        [userid],
        (err, result)=>{
            if(err){
                res.send({err:err}); 
            }
            else{
                res.json(result);
            }
        }
    )
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
            if(result.length > 0){

                const id = result[0]?.idusers;
                const token = jwt.sign({id},"jwtSecret",{
                    //approximately 10 minutes
                    expiresIn:600,
                })
                res.json({auth:true, token: token, result:result})
                //res.send(result);
            }
            else{
                res.json({auth: false, message: "Wrong username/password "});
            }

    });
});

//verifyJWT is middleware to check if the user has the correct web token
const verifyJWT = (req, res, next) =>{
    const token  = req.headers['x-access-token'];
    if(!token){
        res.send('User needs a token');
    }
    else{
        jwt.verify(token,'jwtSecret',(err, decoded)=>{
            if(err){
                res.json({auth:false, message:'Failed to authenticate'});
            }
            else{
                req.userId  = decoded.userId;
                next();
            }
        });
    }
};

app.get('/userAuthInfo', verifyJWT, (req,res)=>{
    res.json('Current user is authenticated');
})

app.delete('/api/delete/:idreflections',(req,res)=>{
    //const id = "SELECT FROM reflections WHERE idreflections ="
    const refID = req.params.idreflections;
    const sqlDelete = "DELETE FROM reflections WHERE idreflections = ?";

    db.query(sqlDelete, refID, (err,result)=>{
        console.log(err);
        console.log(result)
        res.json();
    }
    )
})

app.post("/api/accountcreation",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const sqlInsert = "INSERT INTO users ( email, password) VALUES (?, ?);"

    db.query(sqlInsert,
        [email,password],
        (err,result)=>{
                const token = jwt.sign({email},"jwtSecret",{
                    //approximately 10 minutes
                    expiresIn:600,
                })
                res.json({auth:true, token: token, result:result, message:"Success"})
    })
})

app.post("/api/insert",(req, res)=>{
    //the consts take the variable names as theyre listed in AddReflection.js
    const dates = req.body.day;
    const dayScore = req.body.dayScore;
    const productivityScore = req.body.productivity;
    const notes = req.body.notes;

    const sqlInsert = "INSERT INTO reflections ( dates, dayScore, productivityScore, notes) VALUES (?, ?, ?, ?);";


    db.query(sqlInsert,[dates, dayScore, productivityScore, notes],(err, result)=>{
            //console.log(err);
            //console.log(result);
            res.json(result);
    })
})

app.listen(5002, ()=>{
    console.log("running on port 5002");
})

