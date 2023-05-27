const { Strategy } = require('passport-local');
const boom = require('@hapi/boom'); //libreria para validar los errores
const bcrypt = require('bcrypt');

const UserService = require('./../../../services/user.service');
const service = new UserService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await service.findByEmail(email); // validacion por si no encuentra usuario con el email
      if (!user) {
        done(boom.unauthorized(), false)
      }

      const isMatch = await bcrypt.compare(password,  user.password); //con esta linea se verifica el pasword con el has y si es correctopermite el acceso
      if (!isMatch) { // validacion por si no coinciden el password encriptado con el password en crudo
        done(boom.unauthorized(), false)
      }
      delete user.dataValues.password;
      done(null, user);//si cumple todas las validaciones se envia el done
    } catch (error) {
      done(error, false);

    }
  }
);

module.exports = LocalStrategy;

