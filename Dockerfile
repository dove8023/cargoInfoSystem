FROM node:8.9.4
WORKDIR /opt/app
COPY ./dist /opt/app 
CMD npm install --registry=https://registry.npm.taobao.org && node main.js