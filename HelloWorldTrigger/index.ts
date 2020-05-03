import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { setupTable } from "./sqlSetup";
import { STORED_PROCEDURE_GET_USERS } from "./stored_procedure";

if (process.env.DEVELOPMENT) {
    setupTable();
}

function validateName(name) {
    if (!/^[a-zA-Z]*$/.test(name)) {
        throw {
            message : "Invalid name. Please, only provide your first name.",
            statusCode : 400
        }
    }
    if (name.length > 50) {
        throw {
            message : "Invalid name length!",
            statusCode : 400
        }
    }
}


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name));
   
    if (name) {
        try {
            validateName(name)
            const superHeroes = await STORED_PROCEDURE_GET_USERS();
            const randomSuperHeroName 
                = superHeroes[Math.floor(Math.random() * superHeroes.length)].user_name;
            
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: "Hello " + name + 
                    ". You remind me of " + randomSuperHeroName
            };
        } catch (err) {
            context.res = {
                body: err.message,
                statusCode : err.statusCode
            };
        }

    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};

export default httpTrigger;
