import pg from "pg";


const { Pool } = pg ;
const pool = new Pool({
    'user':'postgres',
    'host':'localhost',
    'database':'NewAge',
    'password':'Bayern1860',
    'port':5432,
    "idleTimeoutMillis": 0,
}) 

export default pool;