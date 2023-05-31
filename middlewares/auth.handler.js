//archivo para la creacionde la validacion
const boom = require('@hapi/boom');
const { config } = require('./../config/config')


function checkApiKey(req, res, next) {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized())
  }
}

function checkAdminRole(req, res, next) { //con este middleware valido que tipo de usuario ingresa al sistema si es admin
  console.log(req.user);
  const user = req.user;
  if (user.role === 'admin') { //si el usuario es admin puede continuar
    next();
  } else {
    next(boom.unauthorized())
  }
}


function checkRoles(...roles) { //con este middleware valido que roles pueden ingresar al endpoint
   return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) { //si el rol del usuario esta incluido en el array puede continuar
      next();
    } else {
      next(boom.unauthorized())
    }
  }
  }


module.exports = { checkApiKey, checkAdminRole, checkRoles }
