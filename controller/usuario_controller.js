const usuarioNegocio = require('../negocio/usuario_negocio');

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