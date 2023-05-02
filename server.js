const express=require("express");
const app=express();
const mongoose=require("mongoose");
const User=require("./models/User")
require("dotenv").config({path:"./config/.env"});
app.use(express.json());
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(console.log("okkk"));

app.get("/",(req,res)=>{res.send('hello node')})

// GET :  RETURN ALL USERS 
app.get('/users',async (req,res)=>{
    try {
       const prsn =await User.find({})
        res.json(prsn)
    } catch (error) {
        console.log(error);
    }
}
)

// POST :  ADD A NEW USER TO THE DATABASE 
app.post("/users", async (req, res) => {
  try {
    const { name, age } = req.body;
    if (!name || !age) {
      return res.status(400).json({ message: "Name and age are required" });
    }
    const user = new User({ name, age });
    await user.save();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT : EDIT A USER BY ID 
app.put("/users/:id", async (req,res)=>{
  try {
    const {id}=req.params;
    const { name, age } = req.body;
    const user = await User.findByIdAndUpdate(id,{name:name,age:age}, { new: true });
    res.json(user);
  } catch (error) {
    console.log(error);
  }
})

// DELETE : REMOVE A USER BY ID 

app.delete("/users/:id",async (req,res)=>{
  try {
      const {id}=req.params;
  const user =await User.findByIdAndRemove(id);
  console.log(`person id:${id} are removed`);
  res.json(user)
  } catch (error) {
    console.log(error);
  }

})


app.listen(3000,(req,res)=>{
    console.log("server connected");
})