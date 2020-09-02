
## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## Run in background
```javascript
yarn build
node dist/src/main.js > /dev/null 2>&1 &
```

## SSL
Generate keys for ssl in api folder: (leave all empty but set FQDN to localhost)

```
mkdir secrets
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout ./secrets/key.pem -out ./secrets/cert.pem
```
