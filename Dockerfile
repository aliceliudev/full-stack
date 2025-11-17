FROM node:20 AS build
ARG VITE_BACKEND_URL=https://bug-free-cod-r5qx65pvwxfwq7-3120.app.github.dev/api/v1
WORKDIR /build
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
# Start the SSR server
CMD ["npm", "start"]


#Dockerfile of previous version
FROM node:20 AS build
ARG VITE_BACKEND_URL="https://poisonous-skeleton-qxx754vxggvf9797-3001.app.github.dev/api/v1"
WORKDIR /build
COPY package*.json .
COPY package-lock.json .
RUN npm install 
COPY . .

RUN npm run build 

FROM nginx AS final 
WORKDIR /usr/share/nginx/html
COPY --from=build /build/dist .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# To build the Docker image, use:
