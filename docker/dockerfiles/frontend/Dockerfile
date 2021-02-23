FROM node:12 as build-stage
ARG API_URL
WORKDIR /opt/a3p/frontend
COPY ./frontend .
COPY ./docker/dockerfiles/frontend/nginx.conf .
RUN npm install
ENV REACT_APP_API_URL $API_URL
RUN npm run build

FROM nginx:mainline
COPY --from=build-stage /opt/a3p/frontend/build /usr/share/nginx/html
COPY --from=build-stage /opt/a3p/frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
