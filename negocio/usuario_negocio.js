const usuarioRepository = require('../repository/usuario_repository');

exports.listar = async () => {
    try { 
    const listaUsuarios = await usuarioRepository.listar();
    return listaUsuarios;
    } catch(err) { throw err; }
}

exports.buscarPorId = async (id) => {
    try {
        const usuario = await usuarioRepository.buscarPorId(id);
        if(!usuario){
            let erro = new Error();
            erro.message = "Usuario nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return usuario;
        }
    }
    catch(err) {
        throw err;
    }
}

exports.inserir = async (usuario) => {
    if(usuario && usuario.nome && usuario.email &&
        usuario.username && usuario.senha){
        try{
            const usuarioInserido = await usuarioRepository.inserir(usuario);
            return usuarioInserido;
        }
        catch(err) {
            throw err;  
        }
        
    }
    else {
        let erro = {}
        erro.message = "Falta parametros de usuario";
        erro.status = 400;
        throw erro;
    }

}

exports.atualizar = async (id, usuario) => {

    if(!usuario || (!usuario.nome && !usuario.email &&
        !usuario.username && !usuario.senha)) {
        let erro = {}
        erro.message = "Falta parametros de usuario";
        erro.status = 400;
        throw erro;        
    }

    try {
        const usuarioDB = await usuarioRepository.buscarPorId(id);
        if(!usuarioDB){
            let erro = new Error();
            erro.message = "Usuario nao encontrado";
            erro.status = 404;
            throw erro;
        }
        
        usuario.nome = usuario.nome || usuarioDB.nome;
        usuario.email = usuario.email || usuarioDB.email;
        usuario.username = usuario.username || usuarioDB.username;
        usuario.senha = usuario.senha || usuarioDB.senha;
        console.log("Usuario",usuario);

        const usuarioAlterado = await usuarioRepository.atualizar(id,usuario);
        return usuarioAlterado;

    }
    catch(err) {
        throw err;
    }
}

exports.deletar = async (id) => {
    try {
        const usuario = await usuarioRepository.deletar(id);
        if(!usuario){
            let erro = new Error();
            erro.message = "Usuario nao encontrado";
            erro.status = 404;
            throw erro;
        }
        else {
            return usuario;
        }
    }
    catch(err) {
        throw err;
    }
}
