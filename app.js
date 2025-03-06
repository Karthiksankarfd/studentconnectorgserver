const express = require("express")
const app = express()
const cors = require('cors')
const connecttoDB = require("./config/db")
const loginRoute = require("./routes/authRoutes")
const postUploadRoute = require("./routes/postUploadRoutes")
const getPostRoute = require("./routes/getPostRoutes")
const path = require('path')
const postupdateRoutes = require("./routes/postActionRoutes")
const bodyParser = require("body-parser");
const searchRoute = require("./routes/searchRoutes")
const getDataRoutes = require("./routes/getDatasRoutes")
const chatRoutes = require("./routes/chatRoutes")
const { createServer } = require("http");
const { Server } = require("socket.io");
const Message = require("./models/convertionSchema")
const server = createServer(app); // Attach Express to HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend to connect
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

connecttoDB()

app.use(bodyParser.json()); // Parses JSON requests

app.use(bodyParser.urlencoded({ extended: true })); // Parses URL-encoded data
// Serve static files from the React build folder

app.use(express.static(path.join(__dirname, '../client/build')));
// Middleware to parse JSON data from request body

app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin,Email');
  res.set('Access-Control-Allow-Credentials', 'true');
  // res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  // res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
  next() // passing to next middleware
})

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ["https://student-connect-client.vercel.app", "http://localhost:3000", "https://6c84-2401-4900-6301-54aa-50e9-d125-d12a-da82.ngrok-free.app", "http://192.168.1.4:3000", "http://192.168.25.45:5000", "https://tiny-toffee-e5ee83.netlify.app", "http://192.168.1.6:3000", "student-connect-client-bdvwfgaun-karthiksankarfds-projects.vercel.app", "http://192.168.45.45:5000/api"]; // frontend origin
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow cookies if needed
  allowedHeaders: "Content-Type, Authorization, X-Requested-With, Accept, Origin,Email"
};

app.use(cors(corsOptions))
app.use("/api/auth", loginRoute);
app.use("/api", postUploadRoute);
app.use("/api", getPostRoute)
app.use("/api", postupdateRoutes)
app.use("/api", searchRoute)
app.use("/api", getDataRoutes); // Use user routes
app.use("/api", chatRoutes)

// here we have the list of user
let onlineUsers = {}

// // Listen for client connection
io.on("connection", (socket) => {

  // Listen for the user to register their details
  socket.on("registerUser", async (registerUser) => {
    onlineUsers[registerUser.userId] = socket.id; // Map userId to socket.id
    console.log("connected users", onlineUsers); // See all connected users
    io.emit("online-users", Object.keys(onlineUsers));

       // Fetch only undelivered messages for the newly connected user
       let undeliveredMessages = await Message.find({
        // "conversationBetween": { $in: [registerUser.userId] }, // Find conversations involving the user
        "messages.delivered": false // Only fetch undelivered messages
      });
    console.log(undeliveredMessages, "these are undelivered messages")

    if (undeliveredMessages.length > 0) {
      // Send undelivered messages to the user
      socket.emit("receiveMessage", undeliveredMessages);

      // Mark those messages as delivered
      for (let convo of undeliveredMessages) {
        convo.messages.forEach((msg) => {
          if (!msg.delivered && msg.receiverId === registerUser.userId) {
            msg.delivered = true;
          }
        });
        await convo.save(); // Save updated messages
      }
    }
  });


  console.log(`User connected: ${socket.id}`);
  // Listen for incoming messages from a client
  socket.on("sendMessage", async (message) => {
    console.log("Message received:", message);
    // When the "sendMessage" event is triggered on the frontend, this function receives the data here.
    // After receiving the data, we can send this message to a specific user using their socket ID (one-to-one messaging).
    // Or, we can broadcast the received message to all clients.
    // Broadcast the received message to all connected clients
    // io.emit("receiveMessage", message); 
    // if(message.sender)
    //socket.broadcast.emit("receiveMessage", message) // send the message to all the clients socket which are connected no
    // Find or create conversation


    let conversation = await Message.findOne({
      conversationBetween: { $all: [message.senderId, message.receiverId] }
    }); // ✅ Only find, do NOT update here
    if (!conversation) {
      conversation = new Message({
        conversationBetween: [message.senderId, message.receiverId],
        messages: [{ text: message.text, senderId: message.senderId, receiverId: message.receiverId, delivered: onlineUsers[message.receiverId] ? true : false }],
      });
    } else {
      conversation.messages.push({ text: message.text, senderId: message.senderId, receiverId: message.receiverId, delivered: onlineUsers[message.receiverId] ? true : false });
    } 
    await conversation.save(); // ✅ Use 'await' to ensure it's saved properly
    // Handle sending a message
    // socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
    //   const conversation = await sendMessage({ body: { senderId, receiverId, message } })
    if (onlineUsers[message.receiverId]) {
      socket.to(onlineUsers[message.receiverId]).emit("receiveMessage", message);
    }
  });
  // when user sends the message store it inside mongodb 
  // if new create the conversation , else update the message field
  // then emit the message to the user using the to(online[userId])


  // Handle disconnect event
  socket.on("disconnect", () => {
    const disconnectedUser = Object.keys(onlineUsers).find(userId => onlineUsers[userId] === socket.id);
    
    if (disconnectedUser) {
      delete onlineUsers[disconnectedUser]; // Remove user from the list
      io.emit("online-users", Object.keys(onlineUsers)); // Notify others
    }

    console.log(`User disconnected: ${socket.id}`);
  });
  
});
// Catch-all route for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

server.listen(5000, "0.0.0.0", () => {
  console.log("The server is running")
})







