const { Pool, Client} = require('pg');

const pool = new Pool({
    user: 'lnoaunsspyqiso',
    host: 'ec2-34-231-183-74.compute-1.amazonaws.com',
    database: 'daqaqii7201sui',
    password: 'f620c04ffd340f74a68043c1e90f9b81d3f0160e4fb5c317aa71f6075d6b45da',
    port: 5432,
    ssl: {
        rejectUnauthorized : false,
    }
  })

async function open(sql){
    const res = await pool.query(sql)
    return res;
}

exports.open = open
