FROM node AS build 
WORKDIR /usr/src/app 
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/killer-sudoku /usr/share/nginx/html