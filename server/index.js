const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const { createServer } = require('node:http');
const socketio = require('socket.io');

const ORIGIN = process.env.ORIGIN;

const app = express();

const corsOptions = {
  origin: ORIGIN,
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

const server = createServer(app);
const mongoose = require('mongoose');
const { addUsers, removeUsers, getUsers, getUser } = require("./helper");
const Room = require('./Models/Room');
const Message = require('./Models/Message');


const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;
const db = process.env.MONGO_DATABASE;
const cluster = process.env.MONGO_CLUSTER;

const mongodb = `mongodb+srv://${user}:${pass}@${cluster}/${db}?retryWrites=true&w=majority`;

mongoose.connect(mongodb)
  .then( ()=> console.log("Connected!") )
  .catch( (e)=> console.log("Error => ", e) );

const io = socketio(server, {
  cors: {
    origin: true,
    credentials: true,
  },
  allowEIO3: true,
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server running at ${ PORT }`);
});

app.get("/set-cookies", (req, res)=>{
  res.cookie("username", "Tony");
  res.cookie("isAuthenticated", true, { secure: true, maxAge:5*60*60*1000 });
  res.send("cookies are set");
})

app.get("/get-cookies", (req, res)=>{
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
})

io.on('connection', (socket)=>{
  console.log(`${socket.id}\n----------`);
  Room.find()
    .then(r =>{
      console.log("output-rooms", r);
      socket.emit("output-rooms", r);
    })
    .catch()
  socket.on('create-room', name =>{
    console.log(`The room received is ${ name }`);
    const room = new Room({ name });
    room.save()
      .then( result =>{
        io.emit("room-created", result)
      })
  });
  socket.on("join", ({ name, room_name, room_id, user_id })=>{
    const { error, user } = addUsers({ socket_id:socket.id, name, room_id, user_id });
    socket.join(room_id);
    if (error){
      console.log("Join error: ", error);
    }
    else {
      console.log("User added succesfully!", user);
    }
  });
  socket.on("send-message", ( message, room_id, callback )=>{
    const user = getUser(socket.id);
    const msgToStore = {
      name: user.name,
      user_id: user.user_id,
      room_id,
      text: message
    };
    console.log("message => ", msgToStore);
    const msg = new Message(msgToStore);
    msg.save()
      .then(r => {
        io.to(room_id).emit("message", r);
        callback();
      } )
  });
  socket.on('get-messages-history', room_id => {
    Message.find({ room_id }).then(result => {
        socket.emit('output-messages', result)
    })
  })
  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
  socket.on("disconnect", ()=>{
    const user = removeUsers(socket.id);
  })
});

