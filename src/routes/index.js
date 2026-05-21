const pessoasRoute = require('./pessoasRoute.js');

module.exports = app => {
    app.use(pessoasRoute);
}

