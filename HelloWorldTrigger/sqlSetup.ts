
import { sql_dropTable, sql_createTables, sql_insertUsers } from "./tableCommands";
import { GET_USERS } from "./stored_procedure";


const sql = require('mssql');

const options = {
    "user":  process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "server":  process.env.DB_SERVER,
    "database": process.env.DB_DATABASE,
    "port" : Number(process.env.DB_PORT),
    "pool": {
        "max": 10,
        "min": 0,
        "idleTimeoutMillis": 30000
    },
    "options": {
        "trustedConnection" : true
    }
};

const mssqlConnect : Promise<any> = (async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(options);
        return sql;
    } catch (err) {
        throw err;
    }
})();

async function generateRequest() {
    try {
        const sql = await mssqlConnect;
        return new sql.Request()
    } catch (err) {
        throw err;
    }
}

async function setupTable() {
    try {
        const request = await generateRequest();
        await request.query(sql_dropTable);
        await request.query(sql_createTables);
        await request.query(sql_insertUsers);
        await request.query(GET_USERS);
    } catch (err) {
        throw err;
    }
}

export { 
    setupTable, 
    generateRequest 
};
