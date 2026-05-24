# 1. Use an official Node.js runtime as the base image
# "alpine" is a very small and lightweight version of Linux
FROM node:18-alpine

# 2. Set the working directory inside the container to /app
WORKDIR /app

# 3. Copy package.json to the working directory
COPY package*.json ./

# 4. Install the dependencies inside the container
RUN npm install

# 5. Copy the rest of your application's code into the container
COPY . .

# 6. Expose port 3000 so we can access it from outside the container
EXPOSE 3000

# 7. Define the command to run your app when the container starts
CMD ["node", "index.js"]
