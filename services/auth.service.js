const boom = require('@hapi/boom'); //libreria para validar los errores
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const{ config } = require('./../config/config');

const UserService = require('./user.service');
const service = new UserService();

class AuthService {

  async getUser(email, password) {
    const user = await service.findByEmail(email); // validacion por si no encuentra usuario con el email
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password,  user.password); //con esta linea se verifica el pasword con el has y si es correctopermite el acceso
    if (!isMatch) { // validacion por si no coinciden el password encriptado con el password en crudo
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id, //identificado del usuario
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  }
  async sendRecovery(email) {
    const user = await service.findByEmail(email); // validacion por si no encuentra usuario con el email
    if (!user) {
      throw boom.unauthorized();
    }
    //se crea el link que envia a la vista de recuperar la contraseña
    const payload = { sub: user.id}; //generar un token para la validacion del link
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfrondtend.com/recovery?token=${token}`; //con esta linea cre crea el link que redirige a la vista
    await service.update(user.id, {recovery_token: token});//con esta linea se actualiza el token en la db
    const mail = { //este es el cuerpo del email que se enviara
      from: config.smtpEmail, // sender address
      to: `${user.email}`,  // list of receivers
      subject: "Email para recuperar contraseña ✔", // Subject line
      html: `<b>Ingresa a este link =>${link}</b>`, // html body
    }
    const rta =  await this.sendMail(mail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
          user: config.smtpEmail,
          pass: config.smtpPassword
      }
    });
    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' }
  }
}

module.exports = AuthService;

