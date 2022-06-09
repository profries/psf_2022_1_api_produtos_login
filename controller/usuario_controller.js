const usuarioNegocio = require('../negocio/usuario_negocio');

const jwt = require('jsonwebtoken');

exports.listar = async (req, res) => {
    try{ 
        const lista = await usuarioNegocio.listar();
        res.json(lista);
    } catch (err) {
        res.status(500).json({error: err});
    }
}

exports.buscarPorId = async (req, res) => {
    const id = req.params.id;
    try{
        const usuario = await usuarioNegocio.buscarPorId(id);
        res.json(usuario);                
    }
    catch (err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});            
        }
    }
}

exports.inserir = async (req, res) => {
    const usuario = req.body;
    
    try{ 
        const usuarioInserido = await usuarioNegocio.inserir(usuario);
        res.status(201).json(usuario);
    }
    catch(err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});            
        }
    }   
}

exports.deletar = async (req, res) => {
    const id = req.params.id;    
    
    try{
        const usuario = await usuarioNegocio.deletar(id);
        res.json(usuario);                
    }
    catch (err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});            
        }
    }
}

exports.atualizar = async(req, res) => {
    const id = req.params.id;  
    const usuario = req.body;
  
    try{
        const usuarioAlterado = await usuarioNegocio.atualizar(id, usuario);
        res.json(usuarioAlterado);                
    }
    catch (err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});            
        }
    }    
}

exports.buscarPorUsername = async (req, res) => {
    const query = req.query;
    if(query && query.username){ 
        try{
            const usuario = await usuarioNegocio.buscarPorUsername(query.username);
            res.json(usuario);                
        }
        catch (err) {
            if(err.status) {
                res.status(err.status).json(err);
            }
            else {
                res.status(500).json({message: "Erro nao identificado"});            
            }
        }
    }
    else {
        //Bad Request
        res.status(400).json({message: "Falta o parametro de busca username"});
    }
}

//Verificar com o negocio para validar o usuario,
//e controller trabalhar na parte de Token
exports.realizarLogin = async (req, res) => {
    const userLogin = req.body;
    try { 
        const usuario = await usuarioNegocio.validarUsuario(userLogin);

        const token = jwt.sign({
            id: usuario.id,
            nome: usuario.nome
        }, "Senac@2022", { expiresIn: '1h' });
        res.status(201).json({"token": token});
    }
    catch(err) {
        if(err.status) {
            res.status(err.status).json(err);
        }
        else {
            res.status(500).json({message: "Erro nao identificado"});            
        }
    }
}

exports.validaToken = (req, res, next) => {
    const token = req.get('Authorization');
    if(token) {
        try{
            const payload = jwt.verify(token, 'Senac@2022');
            console.log("[ValidaToken] Payload",payload);
            next();
        }
        catch(err){
            res.status(403).json({mensagem:"Sem Token de acesso"});
        }        
    }
    else {
        res.status(403).json({mensagem:"Sem Token de acesso"});
    }
}

