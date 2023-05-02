const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const Schema_ex =new Schema(
    {
        name:{ type: String, required: true},
        age:{type:Number}
    }
);

const User = mongoose.model('User',Schema_ex);
module.exports = User;