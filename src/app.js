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

// Without async/await, the MongoDB query returns a Promise, and JavaScript does not wait for it to resolve, so the actual data is not available when we try to send the response.
app.get("/user", async(req,res)=>{
    const userEmail = req.body.emailId;
    console.log(userEmail);

    try{
        const userData = await User.find({ emailId: userEmail});
        // const user = await User.find(); oo we can use to get all the data
        if(userData.length === 0){
            res.status(400).send("User not found");
        }else{
         res.send(userData);   
        }
    }catch(e){
        res.status(400).send("something went wrong");
    }
})

app.delete("/user", async(req,res)=>{
    const userId = req.body.id;
    console.log(userId); 

    const userData = await User.findOneAndDelete(userId);
    res.send("user deleted successfully");

})

app.patch("/user/:userId",async(req,res)=>{
    const userId = req.params?.userId;
    const data = req.body;

    try{
        const ALLOWED_FIELDS =  ["gender", "age", "firstName", "lastName", "skills", "password"];
        const IS_ALLOWED = Object.keys(data).every((k)=>
            ALLOWED_FIELDS.includes(k)
        );

        if(!IS_ALLOWED){
            throw new Error("update not allowed");
        }
        if(data?.skills.length > 10){
            throw new Error("skills cannot be more then 10")
        }
        const userData = await User.findByIdAndUpdate({_id :userId},data,{
        returnDocument: "after",
        runValidators: true,
    })
        res.send("updated successfully");
    }catch(err){
        res.status(400).send("update failed " + err.message);
    }
    
})


app.get("/users", (req, res) => {
    const userEmail = req.body.emailId;
    User.find({ emailId: userEmail })
      .then(user => {
          res.send(user);
      })
      .catch(err => {
          res.status(400).send("something went wrong");
      });
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
        res.status(400).send(err.message);
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




