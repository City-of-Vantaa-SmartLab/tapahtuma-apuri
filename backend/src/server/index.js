const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');

const sess = {
  secret: 'FILL_ME_IN',
  cookie: {
    maxAge: 1800000,
  },
  resave: false,
};

app.use(session(sess));

require('./routes/cms')(app); // Expose cms-routes

if (process.env.NODE_ENV !== 'production') {
  // HOT module replacement logic
  const hotMiddleware = require('./hot.js');
  app.use(hotMiddleware);
} else {
  app.use(express.static(path.resolve(__dirname, '../../build')));
}

app.get('*', (req, res) => {
  res.sendFile(
    path.resolve(__dirname, '../../build/bundle.js', '../../build/index.html')
  );
});

app.listen(process.env.port || 3000, () =>
  console.log('Server is running on port ', process.env.port || 3000)
); //eslint-disable-line
