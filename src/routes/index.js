const pessoasRoute = require('./pessoasRoute.js');
const categoriasRoute = require('./categoriasRoute.js');
const cursosRoute = require('./cursosRoute.js');

module.exports = app => {
    app.use(pessoasRoute);
    app.use(categoriasRoute);
    app.use(cursosRoute);
}

