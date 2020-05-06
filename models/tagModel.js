var mongoose    =   require("mongoose");

const tagSchema = new mongoose.Schema({
    title : {type: String, required: true}},
    { 
       timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
    }
 )

 module.exports = mongoose.model('Tag',tagSchema);