const axios = require("axios").default;

async function Auth() {
    var AuthURL = new URL(
            "https://login.salesforce.com/services/oauth2/token?"
        ),
        params = {
            grant_type: "password",
            client_id: "3MVG9ZlTu2QmDfb3MJF3cxRjO8gABNd3BsfEQDzzAwTbRlP_bJHFRBl_Em8MSHJOPEVQEKUMnic4oAAwl8Iam",
            client_secret: "67B2326366A3E4D19D54C50DB718F6C014706A5B03A1289570DC62B959CF7976",
            username: "mostafaghonem90@gmail.com",
            password: "018410961400Mkg$$@@GHa3v0xVSUbR1SN77rCpzPsW",
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
        url: "https://mostafaghonem-dev-ed.my.salesforce.com/services/data/v56.0/sobjects/Account/",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        data: {
            Name: "Test from VS Code", // This is the body part
        },
    });
}

CreateAcc()
    .then((res) => console.log(res.status)) //if Succeeded //201
    .catch((err) => console.log(err.response.status)); //else //400