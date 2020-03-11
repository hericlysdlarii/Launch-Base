const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")
const videos = require("./data")

nunjucks.configure("views", {
  express:server,
  autoescape: false,
  noCache: true
})

server.get("/", function(req, res){
  const about = {
    avatar_url: "https://avatars2.githubusercontent.com/u/38103867?s=400&u=24ae22b72c6fe7c0aaaa88b4e021a17a8e27a3b0&v=4",
    name: "Hériclys Sousa",
    role: "Graduando - UFPI",
    description: "Programador front/backend, Programador mobile. Inglês intermediário.",
    link: [
      { name: "Github", url: "https://github.com/hericlysdlarii" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/h%C3%A9riclys-d-larii-23740219b/" },
      { name: "Instagram", url: "https://www.instagram.com/dlarii44/" }
    ]
  }
  return res.render("about", {about: about})
})

server.get("/portfolio", function(req, res){
  return res.render("portfolio")
})

server.get("/hobbies", function(req, res){
  return res.render("hobbies", {items: videos})
})

server.get("/video", function(req, res) {
  const id = req.query.id

  const video = videos.find(function(video){
    if (video.id == id){
      return true
    }
  })

  if (!video){
    return res.send("Video not found!")
  }

  return res.render("video", { video })
})

server.listen(5000, function(){
  console.log("Server is running")
})