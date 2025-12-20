# -------------------------
# BUILD STAGE
# -------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Build Angular (production)
RUN npm run build -- --configuration=production


# -------------------------
# RUN STAGE (Nginx)
# -------------------------
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# 👇 COPY THE CORRECT BUILD OUTPUT
COPY --from=build /app/dist/Portfolio1/browser /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
