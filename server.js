const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require('./routes');
const mongoose = require('mongoose');

//require middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set up static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(routes);

mongoose.connect(process.env.MONGODB_URL|| "mongodb://localhost/googlebooks");


app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
})