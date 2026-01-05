const express = require('express');
const  app = express();

app.use("/",(req,res)=>{
    res.send("Hellon nodemonn ");
})

app.use("/test",(req,res)=>{
    res.send("Hello test");
    
})
app.listen(7777, ()=>{
     console.log("sucssfullly listning");
});

