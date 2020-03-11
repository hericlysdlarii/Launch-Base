const express = require('express')
const nunjucks = require('nunjucks')

const server = express()

server.use(express.static('public'))

server.set("view engine", "njk")
const videos = require("./data")

nunjucks.configure("views", {
  express:server
})

server.get("/", function(req, res){
  return res.render("about")
})

server.get("/portfolio", function(req, res){
  return res.render("portfolio")
})

server.get("/hobbies", function(req, res){
  return res.render("hobbies", {items: videos})
})

server.listen(5000, function(){
  console.log("Server is running")
})