const express =  require("express")
const router =  express.Router()
const getMessages =  require("../controllers/chatControllers")
const Messages = require("../models/convertionSchema")
router.get("/messages/:senderId/:receiverId",async (req, res) => {
    console.log("hitted chat apis")
    try {
      const { senderId, receiverId } = req.params;
      console.log(senderId,receiverId)

      const conversation = await Messages.findOne({
        conversationBetween: { $all: [senderId, receiverId] }
      });
     console.log(conversation)
      
      res.status(200).json({
        success: true,
        messages: conversation ? conversation.messages : []
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
)
module.exports = router;