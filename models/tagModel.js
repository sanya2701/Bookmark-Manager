var mongoose    =   require("mongoose");
var uniqueValidator = require('mongoose-unique-validator')

const tagSchema = new mongoose.Schema({
    title : {type: String, unique:true}},
    { 
       timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
    }
 );

 tagSchema.plugin(uniqueValidator);
 module.exports = mongoose.model('Tag',tagSchema);