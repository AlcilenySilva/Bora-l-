const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');



const SECRET_KEY = "seu_segredo_super_secreto"; 

async function autenticarUsuario(email, senha) {
    const usuario = await prisma.usuario.findUnique({ where: { email } });

    if (!usuario) {
        throw new Error("Usuário não encontrado");
    }

    
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
        throw new Error("Senha incorreta");
    }

   
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET_KEY, {
        expiresIn: "2h",
    });

    return { token, usuario };
}

module.exports = { autenticarUsuario };
