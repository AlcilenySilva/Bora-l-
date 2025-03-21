const bcrypt = require('bcryptjs');

const senhaHash = '12345'; 


const senhaFornecida = '12345';

bcrypt.compare(senhaFornecida, senhaHash, (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log("Senhas são iguais?", res); 
    }
});
