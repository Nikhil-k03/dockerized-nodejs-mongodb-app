let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

app.get('/profile-picture', function (req, res) {
  let img = fs.readFileSync(path.join(__dirname, "images/profile-1.jpg"));
  res.writeHead(200, {'Content-Type': 'image/jpg' });
  res.end(img, 'binary');
});

// use when starting application locally
app.post('/update-profile', async function (req, res) {
    try {
        const client = new MongoClient(mongoUrlLocal);
        await client.connect();

        const db = client.db(databaseName);

        let userObj = req.body;
        userObj['userid'] = 1;

        await db.collection("users").updateOne(
            { userid: 1 },
            { $set: userObj },
            { upsert: true }
        );

        await client.close();

        res.send(userObj);
    } catch (err) {
        console.log(err);
        res.send({});
    }
});
// use when starting application as docker container
let mongoUrlLocal="mongodb://admin:pass@mongo:27017/?authSource=admin";
let mongoUrlDocker = "mongodb://admin:password@mongodb:27017";


// "user-account" in demo with docker. "my-db" in demo with docker-compose
let databaseName = "user-account";

app.post('/update-profile', function (req, res) {
    let userObj = req.body;

    MongoClient.connect(mongoUrlLocal, function (err, client) {

        if (err) {
            console.log(err);
            return res.send(userObj);
        }

        let db = client.db(databaseName);
        userObj['userid'] = 1;

        db.collection("users").updateOne(
            { userid: 1 },
            { $set: userObj },
            { upsert: true },
            function (err, result) {

                if (err) console.log(err);

                client.close();
                res.send(userObj);
            }
        );
    });
});

app.get('/get-profile', async function (req, res) {
    try {
        const client = new MongoClient(mongoUrlLocal);
        await client.connect();

        const db = client.db(databaseName);

        const result = await db.collection("users").findOne({ userid: 1 });

        await client.close();

        res.send(result ? result : {});
    } catch (err) {
        console.log(err);
        res.send({});
    }
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});
