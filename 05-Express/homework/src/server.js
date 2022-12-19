// const bodyParser = require("body-parser");
const express = require('express');

const STATUS_USER_ERROR = 422;
let id = 0;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests

server.post('/posts', (req, res) => {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents)
    return res.status(STATUS_USER_ERROR).json({
      error: 'No se recibieron los parámetros necesarios para crear el Post',
    });
  const newPost = {
    author,
    title,
    contents,
    id: ++id,
  };
  posts.push(newPost);
  res.json(newPost);
});

server.post('/posts/author/:author', (req, res) => {
  const { author } = req.params;
  const { title, contents } = req.body;
  if (!title || !contents)
    return res.status(STATUS_USER_ERROR).json({
      error: 'No se recibieron los parámetros necesarios para crear el Post',
    });
  const newPost = {
    author,
    title,
    contents,
    id: id++,
  };
  posts.push(newPost);
  res.json(newPost);
});

server.get('/posts', (req, res) => {
  const { term } = req.query;
  if (term) {
    const filteredPosts = posts.filter(
      (el) => el.title.includes(term) || el.contents.includes(term)
    );
    return res.json(filteredPosts);
  }
  res.json(posts);
});

server.get('/posts/:author', (req, res) => {
  const { author } = req.params;
  const filteredAuthor = posts.filter((el) => el.author === author);
  if (filteredAuthor.length > 0) return res.json(filteredAuthor);
  res
    .status(STATUS_USER_ERROR)
    .json({ error: 'No existe ningun post del autor indicado' });
});

server.get('/posts/:author/:title', (req, res) => {
  const { author, title } = req.params;
  const filtered = posts.filter(
    (el) => el.author === author && el.title === title
  );
  if (filtered.length > 0) return res.json(filtered);
  res
    .status(STATUS_USER_ERROR)
    .json({ error: 'No existe ningun post con dicho titulo y autor indicado' });
});

server.put('/posts', (req, res) => {
  const { id, title, contents } = req.body;
  if (!id || !title || !contents)
    return res.status(STATUS_USER_ERROR).json({
      error:
        'No se recibieron los parámetros necesarios para modificar el Post',
    });
  const postFound = posts.find((el) => el.id === id);
  if (!postFound)
    return res.status(STATUS_USER_ERROR).json({
      error: 'ID no válido',
    });
  postFound.title = title;
  postFound.contents = contents;
  res.json(postFound);
});

server.delete('/posts', (req, res) => {
  const { id } = req.body;
  if (!id)
    return res.status(STATUS_USER_ERROR).json({
      error: 'ID no válido',
    });
  const postFound = posts.find((el) => el.id === id);
  if (!postFound)
    return res.status(STATUS_USER_ERROR).json({
      error: 'ID no válido',
    });
  posts = posts.filter((el) => el.id !== id);
  res.json({ success: true });
});

server.delete('/author', (req, res) => {
  const { author } = req.body;
  if (!author)
    return res.status(STATUS_USER_ERROR).json({
      error: 'ID no válido',
    });
  const authorFound = posts.find((el) => el.author === author);
  if (!authorFound)
    return res.status(STATUS_USER_ERROR).json({
      error: 'No existe el autor indicado',
    });
  let deleted = posts.filter((el) => el.author === author);
  posts = posts.filter((el) => el.author !== author);
  res.json(deleted);
});

module.exports = { posts, server };
