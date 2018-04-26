FROM node:8.10
EXPOSE 8080
WORKDIR /home/node/app
COPY ./Finalest-ERP .
RUN npm install --no-optional
CMD ["npm","start"]
