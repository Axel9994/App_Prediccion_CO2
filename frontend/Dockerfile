# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:latest as build

# set up angular cli
RUN npm install -g @angular/cli@10.1.7

WORKDIR /app

COPY . /app

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build

# create watch files
CMD ng serve --host 0.0.0.0 --disable-host-check --proxy-config proxy.conf.dev.json
EXPOSE 4200