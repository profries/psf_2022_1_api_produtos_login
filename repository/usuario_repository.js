const {Client} = require('pg');

const conexao = {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'postgres',
    database: 'api_produtos_login'
};


exports.listar = async () => {
    const cliente = new Client(conexao);
    cliente.connect();
    try{ 
        const resultado = await cliente.query("SELECT * from usuarios");
        cliente.end();
        return (resultado.rows);
    }
    catch (err) { throw err; }
}

exports.buscarPorId = async (id) => {
    const sql = "SELECT * FROM usuarios WHERE id=$1";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();

    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        return(resultado.rows[0]);        
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}

exports.inserir = async (usuario) => {
    const sql = "INSERT INTO usuarios(nome, email, username, senha) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [usuario.nome, 
        usuario.email,
        usuario.username,
        usuario.senha
    ];

    const cliente = new Client(conexao);
    cliente.connect();
    
    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        return(resultado.rows[0]);
    }
    catch(err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}

exports.atualizar = async (id, usuario) => {
    const sql = "UPDATE usuarios SET nome=$1, email=$2, username=$3, senha=$4 WHERE id=$5 RETURNING *";
    const values = [usuario.nome, 
        usuario.email, 
        usuario.username,
        usuario.senha,
        id
    ];

    const cliente = new Client(conexao);
    cliente.connect();
    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        return(resultado.rows[0]);
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}

exports.deletar = async (id) => {
    const sql = "DELETE FROM usuarios WHERE id=$1 RETURNING *";
    const values = [id];

    const cliente = new Client(conexao);
    cliente.connect();
    try{
        const resultado = await cliente.query(sql, values);
        cliente.end();
        return(resultado.rows[0]);
    }
    catch (err) {
        let error = {};
        error.name = err.name;
        error.message = err.message;
        error.status = 500; 
        throw error; 
    }
}


