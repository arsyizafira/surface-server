/*** App Init ***/
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  morgan = require('morgan'),
  path = require('path'),
  mongoose = require('mongoose'),
  config = require('./database'),
  app = express();

app.use(express.static('files'))
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
app.use('/tenant_img', express.static(path.join(__dirname, '../files/tenant')))
app.use('/event_img', express.static(path.join(__dirname, '../files/event')))
app.use('/blog_img', express.static(path.join(__dirname, '../files/blog')))
app.use('/disease_img', express.static(path.join(__dirname, '../files/disease')))




/*** Global Variable ***/
require(`./global`)(global);

/*** Database Connection ***/


mongoose.connect(config.database, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open', function (callback) {
  console.log('\n\n\n\n');
  console.log(`Server successfully compiled on ${moment().format(`YYYY-MM-DDTHH:mm:ss.SSSZ`)} \nDatabase connection Success!\n\n\n\n\n`);
});

/*** FOR CREATE NEW ROUTES ***/
require(`./routes`)(app);


/*** Start Server ***/
// app.listen(process.env.PORT || 8085, function () {
//   console.log('Server started on port 8081');
// });

module.exports = app;
