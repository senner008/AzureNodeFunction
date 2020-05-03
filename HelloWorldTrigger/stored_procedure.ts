
const sql = require('mssql')
import { procedureNames, tablesNames } from "./SQL_NAMES";
import { generateRequest } from "./sqlSetup";

const GET_USERS = `
    CREATE OR ALTER PROCEDURE ${procedureNames.GET_USERS}
    AS
    BEGIN TRAN

        BEGIN TRY

            SELECT * FROM ${tablesNames.user}
            COMMIT TRAN

        END TRY

    BEGIN CATCH
        ROLLBACK TRAN
    END CATCH  
`;

async function STORED_PROCEDURE_GET_USERS() {
    try {
        const request = await generateRequest();
        const result = await request
            .execute(procedureNames.GET_USERS);

        if (result.recordset === undefined || result.recordset.length == 0) {
            throw {
                message: "Users not found!",
                statusCode: 404
            }
        }
        return result.recordset;
    } catch (err) {
        throw err;
    }
}

export {
    STORED_PROCEDURE_GET_USERS,
    GET_USERS
}
