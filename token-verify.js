//codigo para verificar el tokent
const jwt = require('jsonwebtoken');

const secret = 'myCat'; //llave4 secret
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4NTIzMTgzMX0.TLxGknr5qLmTMDizIzeLYrOZc6WPxWeQ_bq2D9LqeeE'

function verifyToken(token, secret) { //funcion para firmar o generar el token
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret); //
console.log(payload);
