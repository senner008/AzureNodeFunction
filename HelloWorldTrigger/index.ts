import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { setupTable } from "./sqlSetup";
import { STORED_PROCEDURE_GET_USERS } from "./stored_procedure";

setupTable();

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
    var usersResponse;
    try {
        usersResponse = await STORED_PROCEDURE_GET_USERS();
    } catch (err) {
        usersResponse = err
    }

    const randomSuperhero = usersResponse[Math.floor(Math.random() * usersResponse.length)];
    
    if (name) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            // body: "Hello " + (req.query.name || req.body.name),
            body : usersResponse[0]
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};

export default httpTrigger;
