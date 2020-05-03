import { tablesNames } from "./SQL_NAMES";

const sql_dropTable = `
    DROP TABLE IF EXISTS ${tablesNames.user}
`;

const sql_createTables = `
    CREATE TABLE ${tablesNames.user}(
        user_id int PRIMARY KEY,
        user_name varchar(50) NOT NULL
    );
`;

const sql_insertUsers = `
    INSERT INTO ${tablesNames.user}
    VALUES (
        0, 'Batman'
    );

    INSERT INTO ${tablesNames.user}
    VALUES (
        1, 'Superman'
    );
`;

export {
    sql_dropTable,
    sql_createTables,
    sql_insertUsers
}
