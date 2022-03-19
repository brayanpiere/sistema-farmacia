const pg = require('pg');
db = {
    user: 'lnoaunsspyqiso',
    host: 'ec2-34-231-183-74.compute-1.amazonaws.com',
    password: 'f620c04ffd340f74a68043c1e90f9b81d3f0160e4fb5c317aa71f6075d6b45da',
    database: 'daqaqii7201sui'
}

async function open(sql,binds,autoCommit){
    let con= await pg.getConnection(db);
    let result= await con.execute(sql,binds,{autoCommit});
    con.release();
    return result;
}

exports.open = open;