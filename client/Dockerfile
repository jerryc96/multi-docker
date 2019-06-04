# build phase

from node:alpine as builder

workdir '/app'

copy package.json .

run npm install

copy . .

run npm run build

# run phase

# use nginx

from nginx

# exposes port 3000 instead, since we're using that route to talk to server
expose 3000

copy ./nginx/default.conf  /etc/nginx/conf.d/default.conf
copy --from=builder /app/build /usr/share/nginx/html
