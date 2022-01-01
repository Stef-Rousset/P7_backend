const express = require('express');
const app = express();
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const postSignalmentRoutes = require('./routes/post_signalments');
const commentSignalmentRoutes = require('./routes/comment_signalments');
const path = require('path');
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
var xss = require('xss-clean');

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // autorise l'accès à l'API depuis localhost 3000
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // autorise les headers indiqués
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //autorise les verbes indiqués
  res.setHeader('Access-Control-Max-Age', 86400) // how long the response to the preflight request can be cached without sending another preflight request.
  next();
});
// protection againt force attack
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);
// protect http headers
app.use(helmet());
// sanitize inputs
app.use(xss());
//middleware global pour parser le corps json des requetes en objets JS
app.use(express.json());
//images
app.use('/images', express.static(path.join(__dirname, 'images')));
// routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/', postSignalmentRoutes);
app.use('/api/', commentSignalmentRoutes);

module.exports = app;
