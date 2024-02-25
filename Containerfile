FROM registry.access.redhat.com/ubi8/nodejs-18:1-71.1695741533 AS build

USER root

RUN mkdir -p /app

# Set the working directory
WORKDIR /app

COPY . /app

RUN npm install

# Generate the build of the application
RUN npm run build

WORKDIR /app/dist

# Stage 2: Serve app with nginx server
FROM ubi8/nginx-122

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/datum_shop /usr/share/nginx/html

CMD nginx -g "daemon off;"