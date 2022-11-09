const axios = require("axios").default;
const FormData = require("form-data");

// ================================= [ Authentication ] ======================================
async function Auth() {
    //create form-data to avoid sending credentials as parameters in URL to be more secure
    let bodyFormData = new FormData();
    bodyFormData.append("grant_type", "password");
    bodyFormData.append(
        "client_id",
        "Your Client ID"
    );
    bodyFormData.append(
        "client_secret",
        "Your Client Secret"
    );
    bodyFormData.append("username", "Your Email");
    bodyFormData.append(
        "password",
        "Your Password"
    );

    return await axios({
        method: "post",
        url: "https://login.salesforce.com/services/oauth2/token",
        data: bodyFormData,
    });
}
// ================================= [Create Record] ======================================
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

// ================================= [Update Record] ======================================
async function updateRecord(id, fieldName, fieldValue) {
    let response = await Auth();
    let access_token = response.data.access_token;
    return await axios({
        method: "patch",
        url: `https://[YourDomain].my.salesforce.com/services/data/v56.0/sobjects/[Object]/${id}`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        data: {
            [fieldName]: fieldValue,
        },
    });
}

updateRecord("id", "filed Name", "field Value")
    .then((res) => console.log(res.status))
    .catch((err) => console.error(err.response));

// ================================= [Delete Record] ======================================
async function deleteRecord(id) {
    let response = await Auth();
    let access_token = response.data.access_token;
    return await axios({
        method: "DELETE",
        url: `https://[YourDomain].my.salesforce.com/services/data/v56.0/sobjects/[Object]/${id}`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
}
deleteRecord("ID of the record")
    .then((res) => console.log(res.status)) //204 if success
    .catch((err) => console.error(err.response.status)); // 4xx if fail

// ================================= [Query Data] ======================================
async function queryData(query) {
    let response = await Auth();
    let access_token = response.data.access_token;

    return await axios({
        method: "GET",
        url: `https://[YourDomain].my.salesforce.com/services/data/v56.0/query?q=${query}`,
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

// ================================= [Parameterize Search] ======================================
//this Fnc for searching in a specific Object in all records with a Word :)
async function parameterizedQuery(wordToSearch, objName) {
    let response = await Auth();
    let access_token = response.data.access_token;

    return await axios({
        method: "POST",
        url: `https://[YourDomain].my.salesforce.com/services/data/v45.0/parameterizedSearch`,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        data: {
            q: `${wordToSearch}`,
            sobjects: [{ name: `${objName}` }],
            fields: ["id", "name", "phone"],
        },
    });
}

parameterizedQuery("ghonem", "Account")
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));

// ================================= [Print Requests for Test] ======================================
function printRequest() {
    //Print the Requests :-
    axios.interceptors.request.use((request) => {
        console.log("Starting Request", JSON.stringify(request, null, 2));
        return request;
    });
}

// printRequest();