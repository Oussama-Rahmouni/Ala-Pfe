# Use a Node.js LTS Alpine image as the base image
FROM node:lts-alpine

# Create a non-root user and group named "app"
RUN addgroup app && adduser -S -G app app

# Switch to the non-root user "app"
USER app

# Set the NODE_ENV environment variable to "production"
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json, package-lock.json, and npm-shrinkwrap.json files to the working directory
COPY ["package.json*", "package-lock.json*",  "./"]

# Switch back to root user temporarily to change ownership of files
USER root

# Change ownership of files to the non-root user "app"
RUN chown -R app:app .

# Install npm dependencies
RUN npm install

# Install Vite as a development dependency
RUN npm install vite --save-dev

# Copy the rest of the application files to the working directory
COPY . .

# Expose port 5173 to allow external connections (adjust if necessary)
EXPOSE 5173

# Specify the command to run the application (adjust as needed)
CMD npm run dev
