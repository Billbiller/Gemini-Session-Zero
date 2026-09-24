# syntax=docker/dockerfile:1

FROM node:22-slim AS base
WORKDIR /app

# Set production environment flags
ENV NODE_ENV=production

# Install dependencies (temporarily include devDeps to allow Vite build)
COPY package*.json ./
RUN npm install --include=dev

# Copy all source files and build the production static bundle
COPY . .
RUN npm run build

# Clean up dev tools if needed or keep runtime intact for tsx
ENV PORT=3000
EXPOSE 3000

# Start the Express production server
CMD ["npm", "start"]
