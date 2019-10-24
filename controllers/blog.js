const blogRouter = require('express').Router()
const Blog = require('../models/blog')

console.log('blogrouter runs')
blogRouter.get('/', (request, response) => {
  console.log('blogrouter.get runs')
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogRouter.post('/', (request, response) => {
    console.log('blogRouter.post runs')
    console.log('request body in blogrouter', request.body)
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch((error) => {
        console.log(error)
        response.status(500).json(error)
      })
  })

  module.exports = blogRouter