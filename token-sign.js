//codigo para generar y/o firmar el tokent
const jwt = require('jsonwebtoken');

const secret = 'myCat'; //llave4 secret
const payload = {
  sub: 1, //identificado del usuario
  role: 'customer'
}

function signToken(payload, secret) { //funcion para firmar o generar el token
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret); //
console.log(token);
