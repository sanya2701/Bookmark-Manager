const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require('method-override')
const exphbs = require("express-handlebars");
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const app = express();
require('dotenv').config()

app.use(methodOverride('_method'));

//handlebars
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout:"main"
}));
app.set('view engine','handlebars');

//body parser middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}));

//connect DB
mongoose.connect('process.env.MONGODB_URI || mongodb://localhost:27017/bookmarkDB', {useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open',()=>console.log("Connected to DB bookmarkDB"))   
db.on('error',(err)=> console.log(err));                      

//Connect DB models
const Bookmark = require("./models/bookmarkModel");
const Tag = require("./models/tagModel");

//Connect Routes
app.use('/api/bookmark/tag',require("./routes/tagRoutes"))
app.use('/api/bookmark',require("./routes/bookmarkRoutes"));

app.get("/",(req,res)=>{
    res.redirect("/api/bookmark");
})


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("Server Started");
})