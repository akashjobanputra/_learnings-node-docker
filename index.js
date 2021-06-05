// the guy said that we'll use nodemon, but what is used in zylo, how auto restarts are done there?
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const redis = require('redis');
const cors = require('cors');
const RedisStore = require('connect-redis')(session);

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, REDIS_HOST, REDIS_PORT, SESSION_SECRET } = require('./config/config');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

let redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT
});

const app = express();

app.enable("trust proxy");
app.use(cors());
app.use(session({
  store: new RedisStore({client: redisClient}),
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    // saveUnintialized: false,
    httpOnly: true,
    maxAge: 30000,
  }
}))
app.use(express.json());

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => { console.log('connected to db!'); })
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
}
connectWithRetry();

app.get('/api/v1', (req, res) => {
  res.send("<h2>Hey you!!@@!!</h2>");
  console.log("yeah it ran");
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { console.log(`listening on port ${PORT}`)});
