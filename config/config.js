module.exports = {
  MONGO_HOST: process.env.MONGO_HOST || "mongo",
  MONGO_PORT: process.env.MONGO_PORT || 27017,
  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  REDIS_HOST: process.env.REDIS_HOST || 'redis',
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,
}
