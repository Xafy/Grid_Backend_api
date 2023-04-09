const express = require('express');
const cors = require("cors");

const infoRoutes = require("./routes/info.routes");

const app = express();

const corsOptions = { 
    Credentials: false,
    origin : [
        "http://localhost:8081",
        "http://localhost:4200"
    ]
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(function(req, res, next) {
    res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.use('/api/info/', infoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("server Connected successfuly");
});

const db = require("./models");

db.sequelize.authenticate()
.then(()=>{
    console.log("Connection success");
}).catch((error)=>{
    console.log(error);
});

db.sequelize.sync().then(()=>{
    console.log('synced Success')
}).catch((err)=>{
    console.log(err);
})

// async function addInfo(){
//     for (let i = 0 ; i < 7 ; i++){
//         await Info.create({
//         barCode : "A66-999",
//         manufacturer : "ATrane",
//         modelNumber : "BAMCC-A110",
//         building : "AAWest",
//         roomNo : "AA7A-551",
//         quantity : 4
//     })
//     }
// }
// addInfo();

