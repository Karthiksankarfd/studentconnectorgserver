const mongoose = require("mongoose")

const conversationSchema = new mongoose.Schema({
    conversationBetween: {

         type: [String],
         required: true
         
         },
    messages: [
        {type:Object},
        {required:true}
    ]
})

const Message = mongoose.model("Message", conversationSchema);
module.exports = Message;