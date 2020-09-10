const express = require("express")
let app = express()
const socket = require("socket.io")
app.set("view engine", "ejs")
app.use(express.static("public"))
app.get("/", (req, res) => {
  res.render("home")
})
app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room })
})
const server = app.listen(3000, () => {
  console.log("listening on PORT 3000")
})
const io = socket(server)
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit("user-connected", userId)
    socket.on("disconnect", () => {
      socket.to(roomId).broadcast.emit("user-disconnected", userId)
    })
  })
})
