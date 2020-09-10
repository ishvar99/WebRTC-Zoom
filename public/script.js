var socket = io("/")
var peer = new Peer()
peer.on("open", (userId) => {
  socket.emit("join-room", roomId, userId)
})
socket.on("user-connected", (userId) => {
  console.log("user connected ", userId)
})
