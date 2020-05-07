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

//Add tag to bookmark render page
router.get("/:id/addTagToBM",(req,res)=>{
    Bookmark.findById(req.params.id,(err,bm)=>{
        if(err){
            console.log(err);
        }else{
            Tag.find({},(err,tag)=>{
                if(err){
                    console.log(err);
                }else{
                    //console.log(tag);
                    //console.log(bm);
                    res.render("listOfTags",{tag:tag,bm:bm});
                }
            })
        }
    })
})

//Add tag to bookmark post route
router.post("/:id/addTagToBM",(req,res)=>{
    //console.log(req.body);
    const bm = {}
    bm.tag = req.body.btag;
    Bookmark.updateOne({_id:req.params.id},bm,(err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/api/bookmark/"+req.params.id);
        }
    })
})

//Delete tag from bookmark
router.post("/:id/delTag",(req,res)=>{
    console.log(req.body);
    const bm = {}
    bm.tag = '507f191e810c19729de860ea';
    Bookmark.updateOne({_id:req.params.id},bm,(err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect("/api/bookmark/"+req.params.id);
        }
    })
})

module.exports = router;