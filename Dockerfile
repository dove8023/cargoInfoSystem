FROM node:9.11.1
WORKDIR /opt/app
RUN git clone https://github.com/dove8023/cargoInfoSystem.git
RUN npm install --registry=https://registry.npm.taobao.org
CMD node server.js