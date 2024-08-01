# Dockerfile for React application

# Use an official Node runtime as a parent image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the React app
RUN npm run build

# Expose port 5173
EXPOSE 5173

# Start the app
CMD ["npm", "start"]
