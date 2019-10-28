const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const errorHandler = require('../utils/middleware')

blogRouter.get('/', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs.map(blog => blog.toJSON()))
      })
      .catch(error => next(error))
  })
  
  blogRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)

    if (blog.likes === undefined) {
      Object.assign(blog, { likes: 0 })
    }
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch((error) => {
        next(error)
        // console.log(error)
        // response.status(400).json(error)
      })
  })

  blogRouter.delete('/:id', async (request, response) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
      // response.status(400).json({ error: error.message })
    }
  })

  blogRouter.put('/:id', async (request, response) => {
    const blog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes
    }

    try {
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
        new: true,
        omitUndefined: true
      })
      response.json(updatedBlog.toJSON())
    } catch (exception) {
      next(exception)
    }
  })

  module.exports = blogRouter