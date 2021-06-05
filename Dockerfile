FROM node:15
# setting up WORKDIR is recommended, not necessary technically
WORKDIR /app
# package.json or something similar is copied first so that the dependency installation layer gets cached
# and on rebuild, if the package.json hasn't changed, it'll refer the cache.
COPY package.json .
# RUN command is for running commands while building the image (buildtime)
# RUN npm install
ARG NODE_ENV
# To use the value NODE_ENV here, it needs to be stated as an argument here, which should be received from docker-compose file.
RUN if [ "$NODE_ENV" = "development" ]; \
  then npm install; \
  else npm install --only=production; \
  fi


COPY . .
ENV PORT 3000
# EXPOSE doesn't actually do anything, it is just for documentation purpose
# states that image expects you to open up port 3000
# By default docker containers can communicate to the outside world
# but outside world cannot communicate directly to the container, including localhost
EXPOSE $PORT

# Runtime execution, when we're going to run the container
# WIll be overriden by docker-compose ENV
CMD ["node", "index.js"]


# When using bind volumes, if node_modules is deleted or is in stale state in host, that'll reflect in container as well
# as the directories get synced.