# app-venda
Aplicação de modelo

# Back-end
 Nodejs, Express.js, Lowdb, Passport.js, Passport-jwt e Jwt-simple.

# Front-end
Angular 6, Bootstrap, Font Awesome, Moment.js, Ngx-currency e Ngx-toastr.

Start server.

```sh
$ cd backend && npm install && npm start
```


Build docker.

```sh
$ cd backend && docker build . -t app-venda && docker run -p 3000:3000 app-venda
```
