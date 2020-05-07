const express = require("express");
const router = express.Router();
const Bookmark = require("../models/bookmarkModel");
const Tag = require("../models/tagModel");

//Display all bookmarks
router.get("/",(req,res)=>{
    Bookmark.find()
    .populate('tag')
    .exec((err,bm)=>{
        if(err){
            console.log(err);
        }else{
            //console.log(bm);
            res.render("index",{
                bm
            });
        }
    })
})


//Render a page to create a new bookmark
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

//post route to add a new bookmark
router.post("/",(req,res)=>{
    //console.log(req.body);
    const newBm = new Bookmark({
        link:req.body.blink,
        title:req.body.btitle,
        publisher:req.body.bpublisher,
        tag:req.body.btag
    });
    //console.log(newBm);
    newBm.save((err)=>{
        if(err){
            console.log(err.message);
            res.render("errorBM",err);
        }else{
            res.redirect("/api/bookmark");
        }
    })
})

//View a paticular bookmark based on id
router.get("/:id",(req,res)=>{
    Bookmark.findById(req.params.id)
    .populate('tag')
    .exec((err,bm)=>{
        if(err) {
             console.log(err);
        } else {
            //console.log(bm);
            res.render("showUniqBm",{
            bm
        });
    } 
    });
})

//Delete a bookmark
router.delete("/:id",(req,res)=>{
    Bookmark.findById(req.params.id,(err,tag)=>{
        if(err) {
             console.log(err);
        } else {
              Bookmark.deleteOne({_id:req.params.id},(err)=>{
                if(err){
                  console.log(err);
                }
                else{
                  res.redirect("/api/bookmark");
                }
             });
    }
    });
})

module.exports = router;