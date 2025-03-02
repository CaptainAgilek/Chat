import io from "socket.io-client";

export const ROOM = "DEFAULT_ROOM";
let socket;

export const createSocket = (name, room, setJoined, setMessages, setUsers) => {
  socket = io("http://localhost:4000");

  socket.on("joined", (name) => {
    console.log("Someone joined chat room with username: ", name);
    setUsers((state) => (state ? [...state, name] : [name]));
    setMessages((state) =>
      state
        ? [...state, { msg: `${name} joined chat.`, sender: "Server" }]
        : [{ msg: `${name} joined chat.`, sender: "Server" }]
    );
  });

  socket.on("disconnected", (name) => {
    console.log("Someone left chat room with username: ", name);
    setUsers((state) => state.filter((user) => user !== name)); //remove user
    setMessages((state) => [
      ...state,
      { msg: `${name} left chat.`, sender: "Server" },
    ]);
  });

  socket.on("disconnect", () => {
    console.log("I am disconnected");
    window.location.reload();
  });

  socket.on("msg", (data) => {
    console.log("Received msg from server: ", data);
    setMessages((state) => state ? [...state, data] : [data]);
  });

  console.log("Connecting socket to server...");

  if (socket && name)
    socket.emit("join", name, room, (response) => {
      if (response.status === "ok") {
        setJoined(true);
        console.log("received initial chat history: ", response.messages);
        setMessages(response.messages);
        console.log("received users in room: ", response.usersInRoom);
        setUsers(response.usersInRoom);
      } else if (response.status === "name_taken") {
        console.log("Name is already taken, please choose a different name.");
        alert("Name is already taken, please choose a different name.");
      }
    });
};

export const sendMessageToRoom = (message, setMessages, name, room = ROOM) => {
  if (socket) {
    if (message) {
      setMessages((state) => (state ? [...state, message] : [message]));
      socket.emit("msg", { message: message.msg, room });
    }
  }
};
