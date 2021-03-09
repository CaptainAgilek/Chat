import express from "express";
import { Server } from "socket.io";
//import http from "http";
import cors from "cors";

const main = async () => {
  const app = express();
  //const server = http.Server(app);
  //const io = new Server(server);

  app.use(cors());

  const port = 4000;

  //app.get("/*", (_, res) => res.send("Server is running."));

  const server = app.listen(port, () => {
    console.info(`Server started at http://localhost:${port}`);
  });

  const socketMap = new Map();
  const messagesMap = {};

  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    //  console.log("New client connected with id ", socket.id);

    socket.on("join", async (name, room, callback) => {
      //when user joins room

      if (
        socketMap.size > 0 &&
        [...socketMap].map(([name, value]) => value).includes(name) //WARN be careful, this is looping all users, ignoring rooms
      ) {
        return callback({
          status: "name_taken",
        });
      }

      socket.join(room);
      socketMap.set(socket.id, name); //store user's name

      const ids = await io.in(room).allSockets(); //get ids of users in room

      console.log(`${name} joined chat. `);

      socket.broadcast.to(room).emit("joined", name); //notify users in room(except sender) about newly joined user
      console.log("sending chat history: ", messagesMap[room]);
      console.log(room);

      callback({
        status: "ok",
        messages: messagesMap[room], //send chat history
        usersInRoom: ids ? [...ids].map((id) => socketMap.get(id)) : [], //send names of users in room
      });
    });

    socket.on("msg", (data) => {
      console.log("msg send to room, msg: ", data.message);
      const msg = { msg: data.message, sender: socketMap.get(socket.id) };
      socket.broadcast.to(data.room).emit("msg", msg); //send msg to users in room(except sender)

      //push message to chat history
      messagesMap[data.room] = messagesMap[data.room]
        ? [...messagesMap[data.room], msg]
        : [msg];

      console.log("updated history: ", messagesMap[data.room]);
    });

    socket.on("disconnecting", () => {
      console.log("user disconnecting");
      const rooms = socket.rooms;
      if (rooms.size > 1) {
        socket.broadcast
          .to([...rooms][1])
          .emit("disconnected", socketMap.get(socket.id)); //notify users in room(except sender) about disconnected user
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
      socketMap.delete(socket.id);
    });
  });
};

main();
