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

async function CreateAcc() {
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

CreateAcc()
    .then((res) => console.log(res.status)) //if Succeeded //201
    .catch((err) => console.log(err.response.status)); //else //400
