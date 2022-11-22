var jsforce = require("jsforce");

const username = 'username';
const password = 'passwordSecurityToken';

var conn = new jsforce.Connection();

conn.login(username, password, function(err, res) {
    if (err) {
        return console.error(err);
    }
    console.log('Authenticated');
    //=============== Query====================================
    conn.query("SELECT Id, Name FROM Account", function(err, res) {
        if (err) {
            return console.error(err);
        }
        console.log(res);
    });

    //=============== Streaming API pushTopic ==================
    conn.streaming.topic("AccountUpdate").subscribe(function(message) {
        console.log('Event Type : ' + message.event.type);
        console.log('Event Created : ' + message.event.createdDate);
        console.log('Object Id : ' + message.sobject.Id);
        console.log('Record : ' + JSON.stringify(message.sobject)); //here used stringify to see the result as string
        console.log('Event : ' + JSON.stringify(message));
    });
});