//codigo para encriptar la contraseña con la libreria bcrypt
const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'admin 123 .202';
  const hash = await bcrypt.hash(myPassword, 10); //el #10 es las veces que encripta la contraseña
  console.log(hash);
}

hashPassword();
