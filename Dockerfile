FROM node:8.9.4
COPY . /opt/app
WORKDIR /opt/app
RUN git --version
CMD node server.js