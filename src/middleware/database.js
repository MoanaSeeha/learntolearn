import { MongoClient } from 'mongodb';
// import nextConnect from 'next-connect';

//const con_uri = '=mongodb://localhost:27017/?connectTimeoutMS=10000&3t.uriVersion=3&3t.connection.name=LOCAL&3t.alwaysShowAuthDB=true&3t.alwaysShowDBFromUserRole=true'
//const uri = '=mongodb://localhost:27017/?connectTimeoutMS=10000'

const databaseName = process.env.MONGO_DB_DATABASE;

//const uri = "mongodb+srv://cryptotaxes:<password>@dragonlordva.qr6hc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const uri = "mongodb+srv://dev:N7yx35v1892KF4zu@db-mongodb-nyc3-70427-a3332388.mongo.ondigitalocean.com/dargon-dev?authSource=admin&replicaSet=db-mongodb-nyc3-70427&tls=true";
const uri = process.env.MONGO_DB_CONNECT;

console.log("uri", uri)
console.log("process.env", process.env.BLAH)

// const client = new MongoClient(con_uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
//


// MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
//   if (error) {
//     return console.log("Connection failed for some reason");
//   }
//   console.log("Connection established - All well");
//   const db = client.db(databaseName);
// });

async function database(req, res, next) {
  MongoClient.connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) {
      return console.log("Connection failed for some reason");
    }
    console.log("Connection established - All well database ");
    const db = client.db(databaseName);

    req.dbClient = client;
    req.db = client.db('dragon_lord');
    return next();
  });
}

// const middleware = nextConnect();
//
// middleware.use(database);

export default database;