const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema( 
    {
        matchs : { type :String, required :true},
        description : { type :String, required :true},
        date : { type : Date, required :true, default: Date.now},
    }, 
)
const Comment = mongoose.model("comments", commentSchema);

module.exports =  Comment;

