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

  signToken() {
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

  async sendMail(email) {
    const user = await service.findByEmail(email); // validacion por si no encuentra usuario con el email
    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true, // true for 465, false for other ports
      port: 465,
      auth: {
          user: 'customercarearmaniexchange@gmail.com',
          pass: 'apmogdhxboefhfeh'
      }
    });
    await transporter.sendMail({
      from: '"Node App 👻" <customercarearmaniexchange@gmail.com>', // sender address
      to: `${user.email}`,  // list of receivers
      subject: "Este es un nuevo correo ✔", // Subject line
      text: "Hello como estas?", // plain text body
      html: "<b>Hello como estas?</b>", // html body
    });
    return { message: 'Mail sent' }
  }
}

module.exports = AuthService;
