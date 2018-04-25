FROM node:8.10
EXPOSE 5000
WORKDIR /home/node/app
COPY ./Finalest-ERP .
RUN npm install --no-optional
CMD ["npm","start"]