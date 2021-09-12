#Specify a base image - node with specific version
FROM node:12-alpine

#Specify a working directory
WORKDIR /app

#Copy the dependencies files (both packagae json & lock file )
COPY package*.json .


#Install dependencies
RUN npm install

#Copy remaining files
COPY . .

#Default command
CMD ["npm","start"]
