const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const errorResponder = require('./server/errors/error-responder');
const players = require('./server/routes/Players');
const logger = require('./server/logger');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8000;

app.use('/api/players', players);
app.use(errorResponder);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the NFL Rush.'
}));
app.listen(port, () => {
  logger.info(`Server is running on PORT ${port}`);
});
module.exports = app;
