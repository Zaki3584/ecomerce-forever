const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { error, log } = require("console");
const { type } = require("os");

app.use(express.json());
app.use(cors());

//database connection with mongodb
mongoose.connect("mongodb+srv://LazariTools:lazari12tools@cluster0.qtkc1.mongodb.net/e-commerce")

//api creaction

app.get("/",(req,res)=>{
    res.send("Express App is Running")
})



// image storage engine

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload =multer({storage:storage})

//creating upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:"Image uploaded successfully",
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// schema for creating products

const Product = mongoose.model("Product",{
    _id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
     price:{
        type:Number,
        required:true,
    },
    image:{
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    subCategory:{
        type:String,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    date:{
        type:Date,
        default:Date.now,
    },
    bestseller:{
        type:Boolean,
        require:true
    }
})
app.post('/addproduct',async(req,res)=>{
  let products = await Product.find({});
   let _id;
  if(products.length > 0){
     let last_product_array =products.slice(-1);
      let last_product =last_product_array[0];
    _id = last_product._id+1;
  }else{
      _id =1
    }
    const product =new Product({
        _id:_id,
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:req.body.image,
        category:req.body.category,
        subCategory:req.body.subCategory,
        sizes:req.body.sizes,
        date:req.body.date,
        bestseller:req.body.bestseller,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success:true,
        name:req.body.name,
    })
})

//creating  api for deleting products

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({_id:req.body._id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating api for getting all products

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({});
    console.log("All Products Fetched");
    res.send(products);
})


app.listen(port,(error)=>{
    if (!error) {
    console.log("Server Running on port " + port)
    }else{
        console.log("Error" +error)
    }
})