# Salesforce-Integration-with-Js
<b>Integrate with salesforce with Connected App and OAuth2.0</b>

<div>
  <b>Used Endpoint :-</b>
  <ul>
    <li>
      Auth Endpoints : <a href="">https://login.salesforce.com/services/oauth2/token?</a>
    </li>
    <li>
      Create Record Endpoint: <a href="">https://[YourDomain].my.salesforce.com/services/data/v56.0/sobjects/[Object]/</a>
    </li>
    <li>
      Delete Record Endpoint: <a href="">https://[YourDomain].my.salesforce.com/services/data/v56.0/sobjects/[Object]/id</a>
    </li>
    <li>
      Query Endpoint: <a href="">https://[YourDomain].my.salesforce.com/services/data/v56.0/query?q=[SoqlQuery]</a>
    </li>
  </ul>
</div>

<hr style="border:2px solid gray">

<b>Used Params for Authentication :</b>
<ul>
    <li>Client ID</li>
    <li>Client Secret</li>
    <li>Username</li>
    <li>Password</li>
    <li>Grant_type</li>
</ul>

<b>Then, you will recive an access token that you will use in the next requests</b>

<hr style="border:2px solid gray">

<div><b>For now you can :-</b></div>
<ul>
  <li>create a new record</li>
  <li>Delete a record by ID</li>
  <li>Query Data with SOQL query</li>
</ul>
