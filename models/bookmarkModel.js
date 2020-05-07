var mongoose    =   require("mongoose");

const bookmarkSchema = new mongoose.Schema({
   link : {type: String, unique:true},
   title : {type: String},
   publisher : {type: String},
   tag : {type: mongoose.Schema.Types.ObjectId,
           ref: "Tag"}},
       { 
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
       }
)

//name of models - Bookmark and Tag
module.exports = mongoose.model('Bookmark',bookmarkSchema);

