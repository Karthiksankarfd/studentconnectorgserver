//  const Message = require("../models/commentSchema")

//  exports.getMessages = async (req, res) => {
//     try {
//       const { user1, user2 } = req.params;
  
//       const conversation = await Message.findOne({
//         conversationBetween: { $all: [user1, user2] }
//       });
  
//       res.status(200).json({
//         success: true,
//         messages: conversation ? conversation.messages : []
//       });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   };

  
//   exports.sendMessage = async (req, res) => {
//     try {
//       const { senderId, receiverId, message } = req.body;
  
//       // Find or create conversation
//       const conversation = await Message.findOneAndUpdate(
//         { conversationBetween: { $all: [senderId, receiverId] } }, // Check if a conversation exists
//         { $push: { messages: { senderId, message } } }, // Append message
//         { upsert: true, new: true } // Create if not exists
//       );
  
//       res.status(200).json({ success: true, conversation });
//     } catch (error) {
//       res.status(500).json({ success: false, error: error.message });
//     }
//   };


