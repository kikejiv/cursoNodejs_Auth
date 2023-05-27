//en este archivo ponemos las estrategias de autenticacion que utiliciemos
const passport = require('passport');

const LocalStrategy = require('./strategies/local.strategy');

passport.use(LocalStrategy);
