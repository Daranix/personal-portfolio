# Stage 1: Build
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:24-alpine AS runtime
WORKDIR /app

# Pre-set working directory permissions for the 'node' user
RUN chown node:node /app

# Copy production artifacts with 'node' ownership
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/package*.json ./

# Switch to the non-root node user
USER node

# Install production dependencies as the 'node' user
RUN npm install --omit=dev

EXPOSE 4321
CMD ["npm", "start"]
