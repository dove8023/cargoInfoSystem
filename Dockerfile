FROM node:9.11.1
WORKDIR /opt/app
RUN git clone https://github.com/dove8023/cargoInfoSystem.git 
WORKDIR /opt/app/cargoInfoSystem
RUN npm install --registry=https://registry.npm.taobao.org
CMD node server.js