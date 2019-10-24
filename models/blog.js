const mongoose = require('mongoose')

console.log('blog model runs')
// lisäsin new
const blogSchema = mongoose.Schema({   
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  module.exports = mongoose.model('Blog', blogSchema)