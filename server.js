const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
const { Message } = require("./models");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// set up for Socket.io
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  helpers,
  // layoutsDir: path.join(__dirname, "views/layouts"),
  // partialsDir: [path.join(__dirname, "views/partials")],
});

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening at port ${PORT}`));
});

// set up for Socket.io
io.on("connection", (socket) => {
  console.log("a user connected!");

  // Debugging the connection event
  socket.on("connect", () => {
    console.log("A user connected");
  });

  // listen for join-room event
  socket.on("join_room", (room_id) => {
    // join the room
    socket.join(room_id);
    console.log(`User joined room ${room_id}`);
  });

  // listen for chat message
  socket.on("chat_message", async (data) => {
    // Debugging: Log the data to ensure it has the expected structure
    console.log("Received chat_message data:", data);
    // destructure data
    const { room_id, sender_id, message_text, message_timestamp } = data;

    // Validate `room_id`, `message_text`, and `message_timestamp`
    if (!room_id || !message_text || !message_timestamp) {
      console.log("Missing data in chat_message event:", data);
      return;
    }

    // Validate `sender_id` and convert to integer
    const parsedSenderId = parseInt(sender_id, 10);
    if (isNaN(parsedSenderId)) {
      console.log("Invalid sender_id:", sender_id);
      return;
    }

    // try to create a new message
    try {
      // Create a new message entry in the database
      await Message.create({
        room_id: room_id,
        sender_id: parsedSenderId,
        message_text: message_text,
        message_timestamp: message_timestamp,
      });

      // emit the message to the room
      io.to(room_id).emit("chat_message", {
        sender_id: parsedSenderId,
        message_text: message_text,
        message_timestamp: new Date(),
      });
    } catch (err) {
      // log any errors
      console.log("Error sending message: ", err);
    }
  });

  // listen for disconnect event
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
  });
});

// server.listen(PORT, () => {
//   console.log(`Now listening at port ${PORT}`);
// });
