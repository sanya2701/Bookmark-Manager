const express = require("express");
const router = express.Router();
const Tag = require("../models/tagModel");

//Display all tags
router.get("/",(req,res)=>{
    Tag.find({},(err,tag)=>{
        if(err){
            console.log(err);
        }else{
            //console.log(tag);
            res.render("showtag",{
                tag
            })
        }
    })
})

//render a page to create a new tag
router.get("/new",(req,res)=>{
    res.render("addnewTag");
})

//post route to add a new tag
router.post("/",(req,res)=>{
    //console.log(req.body);
    const newTag = new Tag({
        title:req.body.tag_title,
    });
    //console.log(newTag);
    newTag.save((err)=>{
        if(err){
            console.log(err.message); 
            res.render("errorTag",{
                err
            })
        }else{
            res.redirect("/api/bookmark/tag");
        }
    })
})

//View a paticular tag based on id
router.get("/:id",(req,res)=>{
    Tag.findById(req.params.id,(err,tag)=>{
        if(err) {
             console.log(err);
        } else {
            res.render("showUniqTag",{
            tag
        });
    }
    });
})

//Delete a tag
router.delete("/:id",(req,res)=>{
    Tag.findById(req.params.id,(err,tag)=>{
        if(err) {
             console.log(err);
        } else {
              Tag.deleteOne({_id:req.params.id},(err)=>{
                if(err){
                  console.log(err);
                }
                else{
                  res.redirect("/api/bookmark/tag");
                }
             });
    }
    });
})

module.exports = router;
