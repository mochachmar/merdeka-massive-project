# Use Node.js LTS as base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend directory
COPY backend/ .

# Expose the port the app runs on
EXPOSE 5000

# Command to start the backend
CMD ["npm", "run", "start"]
