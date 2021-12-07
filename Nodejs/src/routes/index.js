const express = require('express');

const football = require('./football.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/football',
    route: football,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;