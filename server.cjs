const jsonServer = require('json-server');
const express = require('express');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(express.json({ limit: '20mb' }));

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server 실행: http://localhost:3000');
});