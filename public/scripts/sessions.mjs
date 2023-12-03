import MySQLStore from 'express-mysql-session';
import pool from './pool.mjs';



async function startSession() {
    var sessionConnection = pool.getConnection();
    var sessionStore = new MySQLStore({
        expiration:1000000,
        createDatabaseTable : true,
        schema:{
            tableName:'sessiondb',
            columnNames:{
                session_id: 'session_id',
                expires : 'expires',
                data: 'data'
            }
        }
    },sessionConnection)
    console.log(`my username is ${sessionStore.schema.columnNames.sessionid}`)
    return(sessionStore)
}

export default startSession;