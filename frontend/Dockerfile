# Use a Node.js image
FROM node:18

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy app source
COPY . .

# Build the React app
RUN npm run build

# Install serve to host the static frontend
RUN npm install -g serve

# Expose the frontend port
EXPOSE 3000

# Serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]


