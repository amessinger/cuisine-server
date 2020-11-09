FROM alpine

RUN apk add --no-cache nodejs

CMD ["node","server/main.js"]