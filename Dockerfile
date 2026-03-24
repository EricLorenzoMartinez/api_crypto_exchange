# BUILDER
FROM node:20-alpine AS builder

# Create app directory
WORKDIR /app

# Install npm
RUN npm install -g pnpm@9

# Copy dependencies files (package.json and pnpm-lock.yaml)
COPY package.json pnpm-lock.yaml ./

# Install all dependencies
RUN pnpm install --frozen-lockfile

# Copy all font code
COPY . .

# Compile TypeScript to JavaScript
RUN pnpm run build

# RUNNER
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm@9

# Define production environment variable
ENV NODE_ENV=production

# Copy only the necessary files for production
COPY package.json pnpm-lock.yaml ./

# Install only the production dependencies (ignore development dependencies)
RUN pnpm install --prod --frozen-lockfile

# Copy only the /dist folder (the compiled code) from stage 1
COPY --from=builder /app/dist ./dist

# For security reasons, do not run the app as the root user
USER node

# Expose the port that your API uses
EXPOSE 3000

# Command to start the application
CMD ["node", "dist/server.js"]