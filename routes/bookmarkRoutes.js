const express = require("express");
const router = express.Router();
const Bookmark = require("../models/bookmarkModel");
const Tag = require("../models/tagModel");

router.get("/",(req,res)=>{
    res.render("index")
})

router.get("/new",(req,res)=>{
    Tag.find({},(err,tag)=>{
        if(err){
            console.log(err);
        }else{
        res.render("addnewBM",{
        tag
      });
   }
})
})

module.exports = router;