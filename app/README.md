# Beez

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## NgRX
### Generate feature
```
yarn ng g feature auth/auth --module auth/auth.module.ts --group --api true --creators true
```

# PWA
start pwa

```
yarn ng build --prod
http-server -p 4200 -c-1 ./dist/beez -S
```
Open Chrome with following flags:
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/tmp/beez --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost:4200 https://localhost:4200


> NOTE: if you get the error "Error: Could not find certificate cert.pem", then you should generate a self-signed certificate.

```
# make sure you have openssl
which openssl
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

