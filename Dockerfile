FROM node:10.19.0 as builder
RUN apt update && apt-get install -y yarn

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
