var jsforce = require("jsforce");

const { username, password } = require("./myCredentials.json");

var conn = new jsforce.Connection();

conn.login(username, password, function(err, res) {
    if (err) {
        return console.error(err);
    }
    console.log("Authenticated");
    //=============== Query====================================
    conn.query("SELECT Id, Name FROM Account", function(err, res) {
        if (err) {
            return console.error(err);
        }
        console.log(res);
    });

    //=============== Streaming API pushTopic ==================
    conn.streaming.topic("AccountUpdate").subscribe(function(message) {
        console.log("Event Type : " + message.event.type);
        console.log("Event Created : " + message.event.createdDate);
        console.log("Object Id : " + message.sobject.Id);
        console.log("Record : " + JSON.stringify(message.sobject)); //here used stringify to see the result as string
        console.log("Event : " + JSON.stringify(message));
    });

    // ===========================================================
    //Subscribe to a platform event

    const channel = "/event/Account_Platform_Event__e";
    const replayId = -2; // -2 is all retained events

    const replayExt = new jsforce.StreamingExtension.Replay(channel, replayId);

    const client = conn.streaming.createClient([replayExt]);

    console.log(`Subscriped to ${channel}`);
    client.subscribe(channel, (data) => {
        console.log("Recived Account Update event", data);
    });

    // ==========================================================
    // publish data to the Event Bus
    const eventData = {
        "Account_Name__c": "Mostafa ghonem --from VS code--",
        "Phone__c": "01284100a",
    };

    conn.sobject("Account_Platform_Event__e").create(eventData, (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log("Event published");
        }
    });
});