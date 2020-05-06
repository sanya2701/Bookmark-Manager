var mongoose    =   require("mongoose");

const bookmarkSchema = new mongoose.Schema({
   link : String,
   title : String,
   time_created :{type: Date,default:Date.now},
   publisher : String,
   tags : {type: mongoose.Schema.Types.ObjectId,
           ref: "Tag"}
})

//name of models - Bookmark and Tag
module.exports = mongoose.model('Bookmark',bookmarkSchema);

