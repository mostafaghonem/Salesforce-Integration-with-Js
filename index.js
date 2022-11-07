const axios = require("axios").default;

async function Auth() {
    var AuthURL = new URL(
            "https://login.salesforce.com/services/oauth2/token?"
        ),
        params = {
            grant_type: "password",
            client_id: "Your Client Id",
            client_secret: "Your Client Sceret",
            username: "UserName",
            password: "PasswordSecurityToken",
        };
    Object.keys(params).forEach((key) =>
        AuthURL.searchParams.append(key, params[key])
    );

    return await axios.post(AuthURL.toString());
}
// =======================================================================
async function createRecord() {
    let response = await Auth();
    let access_token = response.data.access_token;
    return await axios({
        method: "post",
        url: "https://[YourDomain].my.salesforce.com/services/data/v56.0/sobjects/[Object]/",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        data: {
            Name: "Test from VS Code", // This is the body part //Name is the Filed name in the Object
        },
    });
}

createRecord()
    .then((res) => console.log(res.status)) //if Succeeded //201
    .catch((err) => console.log(err.response.status)); //else //400
// ======================================================
async function deleteRecord(id) {
    let response = await Auth();
    let access_token = response.data.access_token;
    return await axios({
        method: 'DELETE',
        url: `https://[YourDomain].my.salesforce.com/services/data/v56.0/sobjects/[Object]/${id}`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        }
    })
}
deleteRecord('ID of the record')
    .then(res => console.log(res.status))
    .catch(err => console.error(err.response.status));
// ======================================================
function printRequest() {
    //Print the Requests :-
    axios.interceptors.request.use((request) => {
        console.log("Starting Request", JSON.stringify(request, null, 2));
        return request;
    });
}

// printRequest();


// =========================================================
async function queryData(query) {
    let response = await Auth();
    let access_token = response.data.access_token;

    return await axios({
        method: "GET",
        url: `https://mostafaghonem-dev-ed.my.salesforce.com/services/data/v56.0/query?q=${query}`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
}

queryData("SELECT+Id+,+NAME+FROM+Account") //Example for Account Obj
    .then((res) => {
        console.log(res.status); //200 if successeded

        //iterate over records and print Account Names
        for (rec of res.data.records) {
            console.log(`Account Name :${rec.Name}`);
        }
    })
    .catch((err) => console.error(err.response.status)); //4xx if fail