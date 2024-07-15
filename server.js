const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// set up for Socket.io
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  helpers,
  // layoutsDir: path.join(__dirname, "views/layouts"),
  // partialsDir: [path.join(__dirname, "views/partials")],
});

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
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

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at port ${PORT}`));
});

// set up for Socket.io
io.on("connection", (socket) => {
  console.log("a user connected!");

  // listen for join-room event
  socket.on("join_room", (room_id) => {
    // join the room
    socket.join(room_id);
    console.log(`User joined room ${room_id}`);
  });

  // listen for chat message
  socket.on("chat_message", async (data) => {
    // destructure data
    const { room_id, sender_id, message_text, message_timestamp } = data;

    // try to create a new message
    try {
      // wait for the message to be created
      await Message.create({
        room_id: room_id,
        sender_id: sender_id,
        message_text: message_text,
        message_timestamp: message_timestamp,
      });

      // emit the message to the room
      io.to(room_id).emit("chat_message", {
        sender_id: sender_id,
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
