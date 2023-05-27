//codigo para comparar la contraseña encriptada con
const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = 'admin 123 .202';
  const hash = '$2b$10$7bvgdSStEdyJFOiIyRD7k.cGDhGS.bsZ/P4zqNza1bhsSA0JsEtr6';
  const isMatch = await bcrypt.compare(myPassword, hash); //con esta linea se verifica el pasword con el has y si es correctopermite el acceso
  console.log(isMatch);
}

verifyPassword();
