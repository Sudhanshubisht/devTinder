const express = require('express');
require("./config/database.js")
const  app = express();
const { adminAuth ,userAuth } = require ("./middlewares/auth");
const mongoose = require('mongoose');
const User = require("./models/user");

app.use(express.json());

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://sudhanshu:vbYxHnxOH9HC87zY@sudhanshu.wgfeze9.mongodb.net/devTinder');
}
connectDB().then(()=>{
    console.log("database connected");
    app.listen(7777, () => {
    console.log("successfully listening");
});

})
.catch((err)=>{
    console.log("database not connected");
}); 

app.post("/signup",async(req,res)=>{
    // console.log(req.body);
    const user = new User(req.body)

    //we are passing manual data 
    // const user = new User({
    //     firstName: "Sudhanshu",
    //     lastName: "Bisht",
    //     emailId: "helllo@123",
    //     password: "123"
    // })
    try{
        await user.save();
    res.send("user added succesfully");
    }catch(err){
        res.status(400).send(err.meaasge);
    }
    
})

// app.use("/admin" , adminAuth);
// app.use("/user", userAuth); 

// app.get("/user",(req,res)=>{
//     res.send({firstName:"sudhanshu", lastName:"bisht"})
// })
// app.post("/user",(req,res)=>{
//     res.send("post request")
// })

// app.use("/test",(req,res)=>{
//     res.send("Hello test");
    
// })

// app.delete("/user/delete",(req,res) =>{
//     res.send("delete route")
// })

// app.use("/user",userAuth, (req, res, next) => {
//     console.log("User middleware");
//     // next();
//     res.send("user route");
// });

// app.get("/admin/getroute", (req, res) => {
//     res.send(" inside get route");
// });
// app.post("/admin/post", (req,res) => {
//     res.send("post request");
// })




